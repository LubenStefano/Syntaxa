import { useState } from "react";
import styles from "./CreateTask.module.css";
import { useTasks } from "../../../../hooks/useTasks";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("HTML");
  const [difficulty, setDifficulty] = useState("Easy");
  const [resource, setResource] = useState("");
  const [starterHtml, setStarterHtml] = useState("");
  const [starterCss, setStarterCss] = useState("");
  const [starterJs, setStarterJs] = useState("");
  const { createTask, isLoading, error } = useTasks();

  const handlePublish = async () => {
    const taskData = {
      title,
      tags: tags.split(",").map((tag) => tag.trim()),
      thumbUrl,
      description,
      type,
      difficulty,
      resource,
      starterHtml,
      starterCss,
      starterJs,
    };

    await createTask(taskData);
  };

  return (
    <main className={styles.adminPage}>
      <header className={styles.adminHead}>
        <h1>Create task</h1>
        <p className={styles.muted}>
          Fill the form below to create a new task.
        </p>
      </header>

      <form className={styles.editorForm}>
        <div className={styles.row}>
          <label className={styles.label}>
            Title
            <input
              className={styles.input}
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Tags
            <input
              className={styles.input}
              type="text"
              placeholder="comma separated tags (e.g. css,frontend)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </label>
        </div>

        <label className={styles.label}>
          Thumb (URL)
          <input
            className={styles.input}
            type="text"
            placeholder="/assets/sample.jpg, https://..."
            value={thumbUrl}
            onChange={(e) => setThumbUrl(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Short description
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="Short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className={styles.row}>
          <label className={styles.label}>
            Type
            <select
              className={styles.select}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>html</option>
              <option>css</option>
              <option>js</option>
              <option>all</option>
            </select>
          </label>

          <label className={styles.label}>
            Difficulty
            <select
              className={styles.select}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </label>
        </div>

        <label className={styles.label}>
          Resource (URL)
          <input
            className={styles.input}
            type="text"
            placeholder="https://info.com/lecture/id"
            value={resource}
            onChange={(e) => setResource(e.target.value)}
          />
        </label>

        <h3 className={styles.sectionTitle}>Starter files</h3>

        <label className={styles.label}>
          Starter HTML
          <textarea
            className={styles.textarea}
            rows={6}
            placeholder="<!-- starter html -->"
            value={starterHtml}
            onChange={(e) => setStarterHtml(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Starter CSS
          <textarea
            className={styles.textarea}
            rows={6}
            placeholder="/* starter css */"
            value={starterCss}
            onChange={(e) => setStarterCss(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Starter JS
          <textarea
            className={styles.textarea}
            rows={4}
            placeholder="// starter js"
            value={starterJs}
            onChange={(e) => setStarterJs(e.target.value)}
          />
        </label>

        <div className={styles.formActions}>
          <button
            className={`${styles.button} ${styles.primary}`}
            type="button"
            onClick={handlePublish}
            disabled={isLoading}
          >
            {isLoading ? "Publishing..." : "Publish"}
          </button>
        </div>

        {error && <p className={styles.error}>{error.message}</p>}
      </form>
    </main>
  );
}