import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";

import { useTasks } from "../../../hooks/useTasks";
import { useSaveTask } from "../../../hooks/useSaveTask";
import { instrumentJs } from "../../../utils/instrumentJs";
import styles from "./Sandbox.module.css";
import { useUser } from "../../../context/UserContext";
import { useNotification } from "../../shared/Notification/useNotification";

export default function Sandbox() {
  const { user } = useUser();
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { getTaskById } = useTasks();
  const { saveSandboxTask, fetchSavedTasks } = useSaveTask();
  const { addNotification } = useNotification();

  // Keep latest getTaskById without re-triggering the fetch effect
  const getTaskByIdRef = useRef(getTaskById);
  useEffect(() => {
    getTaskByIdRef.current = getTaskById;
  }, [getTaskById]);

  const [task, setTask] = useState(null);

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  const [active, setActive] = useState("html"); // html | css | js | console
  const [logs, setLogs] = useState([]);

  const [execCode, setExecCode] = useState({ html: "", css: "", js: "" });

  const iframeRef = useRef(null);
  const hasFetched = useRef(false); // Track if the fetch has already occurred

  // Update state setters to remove the editing flag
  function handleHtmlChange(value) {
    setHtml(value);
  }

  function handleCssChange(value) {
    setCss(value);
  }

  function handleJsChange(value) {
    setJs(value);
  }

  // Fetch task and set starter values (DEPEND ONLY ON taskId)
  useEffect(() => {
    let cancelled = false;

    async function fetchTask() {
      if (!taskId || hasFetched.current) {
        return;
      }

      try {
        const currentPath = window.location.pathname; // Get the full path
        if (currentPath.includes("saved")) { // Check if the path contains 'saved'
          if (!user) {
            return;
          }

          const savedTaskId = taskId.split("/").pop(); // Extract the ID from the params
          const savedTasks = await fetchSavedTasks();
          const savedTask = savedTasks.find((task) => task.id === savedTaskId);

          if (cancelled) return;

          if (savedTask) {
            setTask(savedTask);
            setHtml(savedTask.html || "");
            setCss(savedTask.css || "");
            setJs(savedTask.js || "");
            setLogs([]);
            setExecCode({ html: savedTask.html || "", css: savedTask.css || "", js: savedTask.js || "" }); // Ensure preview updates
          } else {
            navigate("/profile");
          }
        } else {
          // Load regular task
          const fetchedTask = await getTaskByIdRef.current(taskId);
          if (cancelled) return;

          setTask(fetchedTask);
          setHtml(fetchedTask?.starterHtml ?? "");
          setCss(fetchedTask?.starterCss ?? "");
          setJs(fetchedTask?.starterJs ?? "");
          setLogs([]);
        }

        hasFetched.current = true; // Mark fetch as completed
      } catch (err) {
        if (!cancelled) {
          setTask(null);
          throw err;
        }
      }
    }

    fetchTask();
    return () => {
      cancelled = true;
    };
  }, [taskId, fetchSavedTasks, navigate, user]);

  // Listen for console messages from iframe
  useEffect(() => {
    function onMessage(e) {
      if (e.source !== iframeRef.current?.contentWindow) return;
      if (!e.data || e.data.type !== "sandbox-console") return;

      setLogs((prev) => {
        const next = [...prev, e.data.payload];
        return next;
      });
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const srcDoc = useMemo(() => {
    const { html: H, css: C, js: J } = execCode;

    let safeJs = J ?? "";
    let parseError = null;

    try {
      safeJs = instrumentJs(safeJs, 600);
    } catch (e) {
      parseError = `JS Parse Error: ${e?.message ?? String(e)}`;
      safeJs = "";
    }

    const USER_JS_STRING = JSON.stringify(safeJs);
    const PARSE_ERROR_STRING = JSON.stringify(parseError);

    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta http-equiv="Content-Security-Policy" content="
  default-src 'none';
  script-src 'unsafe-inline' 'unsafe-eval';
  style-src 'unsafe-inline';
  img-src data:;
  connect-src 'none';
">
  <style>${C}</style>
</head>
<body>
  ${H}

  <script>
    (function () {
      function serialize(v) {
        if (typeof v === "string") return v;
        if (typeof v === "number" || typeof v === "boolean" || v == null) return String(v);
        if (v instanceof Error) return v.name + ": " + v.message;
        try { return JSON.stringify(v); } catch { return String(v); }
      }

      function send(level, args, meta) {
        try {
          window.parent.postMessage({
            type: "sandbox-console",
            payload: {
              level,
              time: Date.now(),
              args: Array.from(args || []).map(serialize),
              meta: meta || null
            }
          }, "*");
        } catch {}
      }

      ["log","info","warn","error","debug"].forEach((level) => {
        console[level] = function () { send(level, arguments); };
      });

      window.alert = function (message) {
        send("info", ["Alert:", message]);
      };

      window.addEventListener("error", function (ev) {
        if (ev && ev.message) {
          send("error", [ev.message], { source: ev.filename, line: ev.lineno, col: ev.colno });
        } else {
          send("error", ["Unknown error"]);
        }
      });

      window.addEventListener("unhandledrejection", function (ev) {
        send("error", ["Unhandled promise rejection:", ev.reason]);
      });

      const __PARSE_ERROR = ${PARSE_ERROR_STRING};
      if (__PARSE_ERROR) {
        send("error", [__PARSE_ERROR]);
        return;
      }

      const __USER_JS = ${USER_JS_STRING};

      try {
        const fn = new Function(__USER_JS);
        fn();
      } catch (err) {
        send("error", ["JS crashed:", err && err.message ? err.message : String(err)]);
      }
    })();
  </script>
</body>
</html>`;
  }, [execCode]);

  function run() {
    if (!user?.validated) {
      setLogs((prevLogs) => [
        ...prevLogs,
        { level: "error", args: ["You must be validated to execute code."] },
      ]);
      addNotification("error", "You must be validated to execute code.");
      return;
    }

    try {
      setLogs([]);
      setExecCode({ html, css, js }); // snapshot
    } catch (error) {
      setLogs((prevLogs) => [
        ...prevLogs,
        { level: "error", args: ["Failed to run code:", error.message] },
      ]);
    }
  }

  function saveCode() {
    try {
      const codeToSave = {
        html,
        css,
        js,
      };

      const taskName = task ? task.title : null;
      const thumbUrl = task && task.thumbUrl ? task.thumbUrl : null;
      saveSandboxTask(codeToSave.html, codeToSave.css, codeToSave.js, taskName, thumbUrl);

      addNotification("success", "Code saved successfully!");
    } catch (error) {
      addNotification("error", `Failed to save code: ${error.message}`);
    }
  }

  const hasTask = !!task;

  useEffect(() => {
    if (iframeRef.current) iframeRef.current.srcdoc = srcDoc;
  }, [srcDoc]);

  return (
    <main>
      <div className={styles.page}>
        {hasTask && (
          <section className={styles.taskInfo}>
            <h1>{task.title}</h1>

            <div className={styles.taskMeta}>
              {window.location.pathname.includes("saved") ? (
                // Show task name, grade, and student name for saved tasks
                <>
                  <p><strong>Task Name:</strong> {task.taskName}</p>
                  <p><strong>Grade:</strong> {task.grade !== null ? task.grade : "Not graded yet"}</p>
                  <p><strong>Student Name:</strong> {task.studentName}</p>
                </>
              ) : (
                // Show difficulty and description for regular tasks
                <>
                  {Array.isArray(task.tags) &&
                    task.tags.map((t) => (
                      <span key={t} className={styles.tagPill}>
                        {t}
                      </span>
                    ))}

                  <span className={styles.difficulty}>
                    Difficulty: {task.difficulty}
                  </span>

                  {task.resource && (
                    <div className={styles.metaActions}>
                      <button
                        className={styles.button}
                        type="button"
                        onClick={() => window.open(task.resource, "_blank")}
                      >
                        Help
                      </button>
                    </div>
                  )}
                  <p>{task.description}</p>
                </>
              )}
            </div>
          </section>
        )}

        <div className={styles.sandboxContainer}>
          <div className={styles.editorContainer}>
            <div className={styles.editorTabs}>
              <Tab label="HTML" active={active === "html"} onClick={() => setActive("html")} />
              <Tab label="CSS" active={active === "css"} onClick={() => setActive("css")} />
              <Tab label="JS" active={active === "js"} onClick={() => setActive("js")} />
              <Tab label="Console" active={active === "console"} onClick={() => setActive("console")} />

              <div className={styles.flexSpacer} />

              <button onClick={run} className={styles.controlButton} type="button">
                Run
              </button>
              {!window.location.pathname.includes("saved") && (
                <button onClick={saveCode} className={styles.controlButton} type="button">
                  Save
                </button>
              )}
            </div>

            <div className={styles.editorArea}>
              {active === "html" && <Monaco language="html" value={html} onChange={handleHtmlChange} />}
              {active === "css" && <Monaco language="css" value={css} onChange={handleCssChange} />}
              {active === "js" && <Monaco language="javascript" value={js} onChange={handleJsChange} />}

              {active === "console" && (
                <ConsoleView logs={logs} />
              )}
            </div>
          </div>

          <div className={styles.previewConsoleContainer}>
            <div className={styles.previewArea}>
              <div className={styles.previewHeader}>Preview</div>
              <iframe
                ref={iframeRef}
                title="preview"
                className={styles.previewIframe}
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Monaco({ language, value, onChange }) {
  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onChange={(v) => onChange(v ?? "")}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        tabSize: 2,
        wordWrap: "on",
        automaticLayout: true,
        readOnly: false, // Ensure the editor is always editable
      }}
    />
  );
}

function ConsoleView({ logs }) {
  return (
    <div className={styles.consoleOutput}>
      {logs.length === 0 ? (
        <div className={styles.noOutput}>No output.</div>
      ) : (
        logs.map((l, i) => {
          const cls = getConsoleLineClass(l?.level);
          return (
            <div key={i} className={`${styles.consoleLine} ${cls}`}>
              <strong>[{l.level}]</strong>{" "}
              {Array.isArray(l.args) ? l.args.join(" ") : String(l.args)}
            </div>
          );
        })
      )}
    </div>
  );
}

function getConsoleLineClass(level) {
  if (level === "error") return styles.consoleError;
  if (level === "warn") return styles.consoleWarn;
  return styles.consoleLog; // log/info/debug/default -> blue
}

function Tab({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={active ? styles.activeTab : styles.inactiveTab}
    >
      {label}
    </button>
  );
}