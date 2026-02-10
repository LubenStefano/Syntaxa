import styles from "./Profile.module.css";
import { useLogout } from "../../../hooks/useAuth";
import { useUser } from "../../../context/UserContext";


import avatarImg from "../../../../assets/bird.png";

export default function Profile() {
  const { logout } = useLogout();
  const { user } = useUser();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const hasSubmissions = user.savedTasks && user.savedTasks.length > 0;

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
            user.savedTasks.map((task) => (
              <li key={task.id} className={styles.taskCard}>
                <div className={styles.thumb}>
                  <img
                    src={task.thumb || avatarImg}
                    alt="submission thumbnail"
                  />
                </div>

                <div className={styles.meta}>
                  <h4>{task.title}</h4>
                  <p>{new Date(task.savedAt).toLocaleString()}</p>
                </div>

                <div className={styles.actions}>
                  <button className={styles.button} type="button">
                    Open
                  </button>
                  {task.grade && (
                    <div className={styles.gradeBadge}>{task.grade}</div>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}