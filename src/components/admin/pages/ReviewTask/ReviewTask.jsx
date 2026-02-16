import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAdminTasks } from "../../../../hooks/useAdminTasks";
import styles from "./ReviewTask.module.css";
import { useNotification } from "../../../shared/Notification/useNotification";


export default function ReviewTask() {
  const { id } = useParams();
  const { fetchAllSavedTasks, updateTaskGrade } = useAdminTasks();
  const [submission, setSubmission] = useState(null);
  const { addNotification } = useNotification()

  useEffect(() => {
    async function loadSubmission() {
      try {
        const tasks = await fetchAllSavedTasks();
        const task = tasks.find((t) => t.id === id);
        setSubmission(task);
      } catch (error) {
        addNotification("error", error)
      }
    }

    loadSubmission();
  }, [id, fetchAllSavedTasks, addNotification]);

  const handleSaveGrade = async () => {
    const gradeInput = document.querySelector(`.${styles.gradeInput}`);
    const grade = parseInt(gradeInput.value, 10);

    if (isNaN(grade) || grade < 0 || grade > 100) {
      alert("Please enter a valid grade between 0 and 100.");
      return;
    }

    try {
      await updateTaskGrade(id, grade);
      alert("Grade saved successfully.");
    } catch {
      alert("Failed to save grade. Please try again.");
    }
  };

  if (!submission) {
    return <div>Loading...</div>;
  }

  const srcDoc =
    (submission.css ? `<style>${submission.css}</style>` : "") +
    (submission.html || "") +
    (submission.js ? `<script>${submission.js}</script>` : "");

  return (
    <main className={styles.adminPage}>
      <h1>Review Submission</h1>

      <div className={styles.reviewGrid}>
        <div className={styles.leftCol}>
          <label className={styles.label}>Student</label>
          <div className={styles.readonlyBox}>{submission.studentName}</div>

          <label className={styles.label}>Submitted At</label>
          <div className={styles.readonlyBox}>{submission.dateCreated}</div>

          <label className={styles.label}>Grade (out of 100)</label>
          <input
            className={styles.gradeInput}
            type="number"
            min={0}
            max={100}
            placeholder="0–100"
            defaultValue={submission.grade}
          />

          <div className={styles.saveWrap}>
            <div
              className={`${styles.button} ${styles.primary}`}
              type="button"
              onClick={handleSaveGrade}
            >
              Save Grade
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <label className={styles.label}>Solution Preview</label>

          <label className={styles.label}>Solution HTML</label>
          <textarea
            className={styles.textarea}
            rows={6}
            placeholder="<!-- Solution HTML -->"
            defaultValue={submission.html}
          />

          <label className={styles.label}>Solution CSS</label>
          <textarea
            className={styles.textarea}
            rows={6}
            placeholder="/* Solution CSS */"
            defaultValue={submission.css}
          />

          <label className={styles.label}>Solution JS</label>
          <textarea
            className={styles.textarea}
            rows={4}
            placeholder="// Solution JS"
            defaultValue={submission.js}
          />

          <iframe
            className={styles.preview}
            sandbox="allow-scripts allow-same-origin"
            title="Solution Preview"
            srcDoc={srcDoc}
          />
        </div>
      </div>
    </main>
  );
}