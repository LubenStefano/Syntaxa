import { parse } from "acorn";
import MagicString from "magic-string";

export function instrumentJs(code, timeoutMs = 500) {
  const ast = parse(code, {
    ecmaVersion: "latest",
    sourceType: "script"
  });

  const s = new MagicString(code);

  s.prepend(`
const __START = performance.now();
function __GUARD(){
  if (performance.now() - __START > ${timeoutMs}) {
    throw new Error("Execution timed out (possible infinite loop)");
  }
}
`);

  function walk(node) {
    if (!node || typeof node !== "object") return;

    if (
      node.type === "WhileStatement" ||
      node.type === "ForStatement" ||
      node.type === "DoWhileStatement" ||
      node.type === "ForOfStatement" ||
      node.type === "ForInStatement"
    ) {
      const body = node.body;

      if (body.type === "BlockStatement") {
        s.appendLeft(body.start + 1, "__GUARD();");
      } else {
        s.prependLeft(body.start, "{__GUARD();");
        s.appendRight(body.end, "}");
      }
    }

    for (const key in node) {
      const val = node[key];
      if (Array.isArray(val)) val.forEach(walk);
      else walk(val);
    }
  }

  walk(ast);

  return s.toString();
}