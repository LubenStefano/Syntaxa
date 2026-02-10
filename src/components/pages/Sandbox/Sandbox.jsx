import { useParams } from "react-router";
import { useTasks } from "../../../hooks/useTasks";
import { useEffect, useState } from "react";
import styles from "./Sandbox.module.css";

export default function Sandbox() {
  const { taskId } = useParams();
  const { getTaskById } = useTasks();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        try {
          const fetchedTask = await getTaskById(taskId);
          setTask(fetchedTask);
        } catch (error) {
          console.error("Failed to fetch task:", error);
        }
      }
    };

    fetchTask();
  }, [taskId, getTaskById]);

  const hasTask = !!task;

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