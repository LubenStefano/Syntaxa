import styles from "./SolvedTasks.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAdminTasks } from "../../../../hooks/useAdminTasks";
import { useNotification } from "../../../shared/Notification/useNotification";


export default function SolvedTasks() {
  const [submissions, setSubmissions] = useState([]);
  const [showAll, setShowAll] = useState(false); // Toggle to show all or ungraded only
  const { fetchAllSavedTasks } = useAdminTasks();

  const navigate = useNavigate();

  const {addNotification } = useNotification()

  useEffect(() => {
    async function loadSavedTasks() {
      try {
        const tasks = await fetchAllSavedTasks();

        // Filter tasks based on the toggle
        const filteredTasks = showAll ? tasks : tasks.filter((task) => task.grade === null || task.grade === undefined);
        setSubmissions(filteredTasks);
      } catch {
        addNotification("error", "Failed to fetch saved tasks. Please try again later.");
      }
    }

    loadSavedTasks();
  }, [fetchAllSavedTasks, showAll, addNotification]); // Re-run when `showAll` changes

  const has = submissions.length > 0;

  function handleReview(id) {
    navigate(`/admin/review-task/${id}`);
  }

  return (
    <main className={styles.adminPage}>
      <header className={styles.adminHead}>
        <h1>Solved Tasks</h1>
        <p className={styles.muted}>
          List of all saved submissions (all students). Open one to review and grade.
        </p>
        <div className={styles.toggleButton} onClick={() => setShowAll((prev) => !prev)}>
          {showAll ? "Show Ungraded Only" : "Show All"}
        </div>
      </header>

      <section className={styles.profileTasks}>
        <ul className={styles.completedList}>
          {!has && (
            <li className={styles.empty}>No saved submissions yet.</li>
          )}

          {submissions.map((s) => (
            <li key={s.id} className={styles.taskCard}>
              <div className={styles.meta}>
                <h4>{s.taskName}</h4> {/* Display task name */}
                <p>Submitted by: {s.studentName}</p> {/* Display student name */}
                <p>Grade: {s.grade !== null && s.grade !== undefined ? s.grade : "Not graded yet"}</p> {/* Display grade */}
                <p>Date Created: {new Date(s.dateCreated).toLocaleString()}</p> {/* Display formatted date */}
              </div>

              <div className={styles.actions}>
                <div className={styles.button} type="button" onClick={() => {handleReview(s.id)}}>
                  Review
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}