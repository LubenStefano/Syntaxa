import styles from "./SolvedTasks.module.css";
import { useNavigate } from "react-router-dom";

import flowersImg from "../../../../../assets/flowers.jpg";

const submissions = [
  {
    id: "sub_001",
    student: "Ivan Petrov",
    taskTitle: "responsive card",
    submittedAt: "2026-02-09 14:30",
    grade: null, // not graded yet
    thumb: flowersImg,
  },
  {
    id: "sub_002",
    student: "Maria Georgieva",
    taskTitle: "hover states",
    submittedAt: "2026-02-09 12:10",
    grade: 74,
    thumb: flowersImg,
  },
  {
    id: "sub_003",
    student: "Georgi Ivanov",
    taskTitle: "flexbox layout",
    submittedAt: "2026-02-08 20:55",
    grade: null,
    thumb: flowersImg,
  },
];

export default function SolvedTasks() {
  const has = submissions.length > 0;

  const navigate = useNavigate()

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
      </header>

      <section className={styles.profileTasks}>
        <ul className={styles.completedList}>
          {!has && (
            <li className={styles.empty}>No saved submissions yet.</li>
          )}

          {submissions.map((s) => (
            <li key={s.id} className={styles.taskCard}>
              <div className={styles.thumb}>
                <img src={s.thumb} alt="submission thumbnail" />
              </div>

              <div className={styles.meta}>
                <h4>{s.taskTitle}</h4>
                <p>Submitted by: {s.student}</p>
                <p>{s.submittedAt}</p>
              </div>

              <div className={styles.actions}>
                <button className={styles.button} type="button" onClick={() => {handleReview(s.id)}}>
                  Review
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}