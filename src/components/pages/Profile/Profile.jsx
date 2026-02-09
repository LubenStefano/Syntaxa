import styles from "./Profile.module.css";

import avatarImg from "../../../../assets/bird.png";
import flowersImg from "../../../../assets/flowers.jpg";

const profile = {
  name: "Your Name",
  email: "you@example.com",
  bio: "Short bio goes here. Tell people what you like to build.",
  avatar: avatarImg,
};

const submissions = [
  {
    id: "responsive_card",
    title: "responsive card",
    savedAt: "2026-02-09 14:30",
    thumb: flowersImg,
    grade: "86%",
  },
  {
    id: "hover_states",
    title: "hover states",
    savedAt: "2026-02-08 20:10",
    thumb: flowersImg,
    grade: "74%",
  },
];

export default function Profile() {
  const hasSubmissions = submissions.length > 0;

  return (
    <main className={styles.profilePage}>
      <section className={styles.profileCard}>
        <div className={styles.avatarWrap}>
          <img className={styles.avatar} src={profile.avatar} alt="avatar" />
        </div>

        <div className={styles.profileInfo}>
          <h2 className={styles.displayName}>{profile.name}</h2>
          <p className={styles.displayEmail}>{profile.email}</p>
          <p className={styles.displayBio}>{profile.bio}</p>

          <div className={styles.profileActions}>
            {/* kept empty intentionally (you removed buttons) */}
          </div>
        </div>
      </section>

      <section className={styles.profileTasks}>
        <h3>Completed tasks</h3>
        <p className={styles.tasksHint}>Submissions you saved from task pages.</p>

        <ul className={styles.completedList}>
          {!hasSubmissions && (
            <li className={styles.empty}>No saved submissions yet.</li>
          )}

          {submissions.map((s) => (
            <li key={s.id} className={styles.taskCard}>
              <div className={styles.thumb}>
                <img src={s.thumb} alt="submission thumbnail" />
              </div>

              <div className={styles.meta}>
                <h4>{s.title}</h4>
                <p>{s.savedAt}</p>
              </div>

              <div className={styles.actions}>
                <button className={styles.button} type="button">
                  Open
                </button>
                <div className={styles.gradeBadge}>{s.grade}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}