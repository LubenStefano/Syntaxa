import { useParams } from "react-router";
import styles from "./Sandbox.module.css";

export default function Sandbox() {
  let taskData = [
    {
      id: "build-responsive-card",
      title: "Build a Responsive Card — Task",
      difficulty: "Medium",
      tags: ["Frontend", "CSS"],
      recommendedLectureLabel: "Recommended Lecture",
      whatWeWant:
        "Create a responsive card component that includes an image, title and description. The card should adapt to different screen widths, have a hover elevation effect, and use accessible HTML (semantic elements, alt text). You may reuse the sample image provided in the resources.",
    },
  ];

  const { taskId } = useParams();

  console.log("Task ID from URL:", taskId);
  if (!taskId) {
    console.log("Task ID is undefined or not provided:", taskId);
    taskData = [];
  }

  const hasTask = taskData.length > 0;
  const task = hasTask ? taskData[0] : null;

  return (
    <main className={styles.page}>
      {/* Optional Task Info (only when taskData has item) */}
      {hasTask && (
        <section className={styles.taskInfo}>
          <h1>{task.title}</h1>

          <div className={styles.taskMeta}>
            {task.tags.map((t) => (
              <span key={t} className={styles.tagPill}>
                {t}
              </span>
            ))}

            <span className={styles.difficulty}>Difficulty: {task.difficulty}</span>

            <div className={styles.metaActions}>
              <button className={styles.button} type="button">
                {task.recommendedLectureLabel}
              </button>
            </div>
          </div>

          <h3>What we want</h3>
          <p>{task.whatWeWant}</p>
        </section>
      )}

      {/* Sandbox Editors (always visible) */}
      <div className={styles.sandboxContainer}>
        <div className={`${styles.editor} ${styles.htmlEditor}`}>
          <label htmlFor="html">HTML</label>
          <textarea id="html" spellCheck={false} />
        </div>

        <div className={`${styles.editor} ${styles.cssEditor}`}>
          <label htmlFor="css">CSS</label>
          <textarea id="css" spellCheck={false} />
        </div>

        <div className={`${styles.editor} ${styles.jsEditor}`}>
          <label htmlFor="js">JS</label>
          <textarea id="js" spellCheck={false} />
        </div>

        <div className={`${styles.editor} ${styles.resultEditor}`}>
          <label htmlFor="result">Result</label>
          <iframe id="result" sandbox="allow-scripts allow-same-origin" title="result" />
        </div>
      </div>

      <div className={styles.sandboxControls}>
        <button className={styles.button} type="button">
          Run
        </button>

        <button className={styles.button} type="button">
          Reset
        </button>

        <button className={styles.button} type="button">
          Save
        </button>

      </div>
    </main>
  );
}