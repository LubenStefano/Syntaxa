import styles from "./CreateTask.module.css";

export default function CreateTask() {
  return (
    <main className={styles.adminPage}>
      <header className={styles.adminHead}>
        <h1>Create task</h1>
        <p className={styles.muted}>
          Fill the form below to create a new task. (No persistence in this stub.)
        </p>
      </header>

      <form className={styles.editorForm}>
        <div className={styles.row}>
          <label className={styles.label}>
            Title
            <input className={styles.input} type="text" placeholder="Task title" />
          </label>

          <label className={styles.label}>
            Tags
            <input
              className={styles.input}
              type="text"
              placeholder="comma separated tags (e.g. css,frontend)"
            />
          </label>
        </div>

        <label className={styles.label}>
          Short description
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="Short description"
          />
        </label>

        <div className={styles.row}>
          <label className={styles.label}>
            Type
            <select className={styles.select}>
              <option>HTML</option>
              <option>CSS</option>
              <option>JS</option>
            </select>
          </label>

          <label className={styles.label}>
            Difficulty
            <select className={styles.select}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </label>
        </div>

        <label className={styles.label}>
          Resources (comma separated URLs)
          <input
            className={styles.input}
            type="text"
            placeholder="/assets/sample.jpg, https://..."
          />
        </label>

        <h3 className={styles.sectionTitle}>Starter files</h3>

        <label className={styles.label}>
          Starter HTML
          <textarea
            className={styles.textarea}
            rows={6}
            placeholder="<!-- starter html -->"
          />
        </label>

        <label className={styles.label}>
          Starter CSS
          <textarea
            className={styles.textarea}
            rows={6}
            placeholder="/* starter css */"
          />
        </label>

        <label className={styles.label}>
          Starter JS
          <textarea
            className={styles.textarea}
            rows={4}
            placeholder="// starter js"
          />
        </label>

        <div className={styles.formActions}>
          <button className={`${styles.button} ${styles.primary}`} type="button">
            Publish
          </button>
          <button className={styles.button} type="button">
            Preview
          </button>
        </div>
      </form>
    </main>
  );
}