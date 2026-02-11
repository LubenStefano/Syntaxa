import styles from "./Profile.module.css";
import { useLogout } from "../../../hooks/useAuth";
import { useUser } from "../../../context/UserContext";
import { useSaveTask } from "../../../hooks/useSaveTask";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import avatarImg from "../../../../assets/bird.png";

export default function Profile() {
  const { logout } = useLogout();
  const { user } = useUser();
  const { fetchSavedTasks } = useSaveTask();
  const [savedTasks, setSavedTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadSavedTasks() {
      try {
        const tasks = await fetchSavedTasks();
        setSavedTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch saved tasks:", error);
      }
    }

    if (user) {
      loadSavedTasks();
    }
  }, [user, fetchSavedTasks]);

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const hasSubmissions = savedTasks.length > 0;

  return (
    <main className={styles.profilePage}>
      <section className={styles.profileCard}>
        <div className={styles.avatarWrap}>
          <img
            className={styles.avatar}
            src={avatarImg}
            alt="avatar"
          />
        </div>

        <div className={styles.profileInfo}>
          <h2 className={styles.displayName}>{`${user.firstName} ${user.lastName}`}</h2>
          <p className={styles.displayEmail}>{user.email}</p>
          <p className={styles.displayBio}>
            Member since{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>

        </div>
        <div className={styles.profileActions}>
          <button
            className={styles.btn}
            onClick={handleLogout}
            type="button"
          >
            Logout
          </button>
        </div>
      </section>

      <section className={styles.profileTasks}>
        <h3>Completed tasks</h3>
        <p className={styles.tasksHint}>
          Submissions you saved from task pages.
        </p>

        <ul className={styles.completedList}>
          {!hasSubmissions && (
            <li className={styles.empty}>No saved submissions yet.</li>
          )}

          {hasSubmissions &&
            savedTasks.map((task) => (
              <li
                key={task.id}
                className={styles.taskCard}
                onClick={() => navigate(`/sandbox/saved/${task.id}`)}
              >
                <div className={styles.thumb}>
                  <img
                    src={task.thumb || avatarImg}
                    alt="submission thumbnail"
                  />
                </div>

                <div className={styles.meta}>
                  <h4>{task.taskName}</h4>
                  <p>{new Date(task.dateCreated).toLocaleString()}</p>
                </div>

                <div className={styles.gradeBadge}>
                  {task.grade ? `${task.grade}/100` : "?/100"}
                </div>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}