import styles from "./Profile.module.css";
import { useLogout } from "../../../hooks/useAuth";
import { useUser } from "../../../context/UserContext";
import { useSaveTask } from "../../../hooks/useSaveTask";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Spin } from "antd";
import { useNotification } from "../../shared/Notification/useNotification";


import avatarImg from "../../../../assets/bird.png";

export default function Profile() {
  const { logout } = useLogout();
  const { user, loading } = useUser();
  const { fetchSavedTasks } = useSaveTask();
  const [savedTasks, setSavedTasks] = useState([]);
  const navigate = useNavigate();

  const { addNotification } = useNotification()

  useEffect(() => {
    async function loadSavedTasks() {
      try {
        const tasks = await fetchSavedTasks();
        setSavedTasks(tasks);
      } catch (error) {
        addNotification("error", error)
      }
    }

    if (user) {
      loadSavedTasks();
    }
  }, [user, fetchSavedTasks, addNotification]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user && !loading) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div
        style={{
          position: "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Spin size="large" />
      </div>
    );
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
                    src={task.thumbUrl || avatarImg}
                    alt="submission thumbnail"
                  />
                </div>

                <div className={styles.meta}>
                  <h4>{task.taskName}</h4>
                  <p>{new Date(task.dateCreated).toLocaleString()}</p>
                </div>

                <div className={styles.gradeBadge}>
                  {task.grade ? `${task.grade}/100%` : "?/100%"}
                </div>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}