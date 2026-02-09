import styles from "./CreateLecture.module.css";

export default function CreateLecture() {
  return (
    <main className={styles.adminPage}>
      <header className={styles.adminHead}>
        <h1>Create lecture</h1>
        <p className={styles.muted}>
          Add a lecture entry with video and resources (UI only).
        </p>
      </header>

      <form className={styles.editorForm}>
        <label>
          Title
          <input type="text" placeholder="Lecture title" />
        </label>

        <label>
          Video URL
          <input
            type="url"
            placeholder="https://www.youtube.com/embed/..."
          />
        </label>

        <label>
          Description
          <textarea rows={4} />
        </label>

        <label>
          Tags
          <input type="text" placeholder="comma separated tags" />
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