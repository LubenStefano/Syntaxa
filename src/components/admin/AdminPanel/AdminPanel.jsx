import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styles from "./AdminPanel.module.css";

const tabs = [
  { key: "create-task", label: "Create Task" },
  { key: "create-lecture", label: "Create Lecture" },
  { key: "solved-tasks", label: "Solved Tasks" },
];

export default function AdminPanel() {
  const [active, setActive] = useState("create-task");
  const navigate = useNavigate();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>SYNTAXA Admin</div>

        <nav className={styles.menu}>
          {tabs.map((t) => (
            <div
              key={t.key}
              type="button"
              className={`${styles.menuItem} ${active === t.key ? styles.active : ""}`}
              onClick={() => {
                setActive(t.key);
                navigate(`/admin/${t.key}`);
              }}
            >
              {t.label}
            </div>
          ))}
        </nav>
      </aside>

      <section className={styles.content}>
        <div className={styles.contentInner}>
          <Outlet />
        </div>
      </section>
    </div>
  );
}