import styles from "./ReviewTask.module.css";

const submission = {
  student: "Unknown",
  submittedAt: "—",
  grade: "",
  html: `<div class="card">
  <img src="https://picsum.photos/640/360" alt="sample image">
  <div class="card-body">
    <h3>Sample Card</h3>
    <p>Example submission</p>
  </div>
</div>`,
  css: `.card{max-width:420px;border-radius:12px;overflow:hidden;border:1px solid #e6e9f0;box-shadow:0 8px 24px rgba(47,59,78,0.06);font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial}
.card img{width:100%;display:block}
.card-body{padding:12px}
.card-body h3{color:#2f3b4e;margin:0 0 6px}
.card-body p{margin:0;color:rgba(47,59,78,0.7)}`,
  js: `// optional JS for interactions`,
};

const srcDoc =
  (submission.css ? `<style>${submission.css}</style>` : "") +
  (submission.html || "") +
  (submission.js ? `<script>${submission.js}</script>` : "");

export default function ReviewTask() {
  return (
    <main className={styles.adminPage}>
      <h1>Review submission</h1>

      <div className={styles.reviewGrid}>
        <div className={styles.leftCol}>
          <label className={styles.label}>Student</label>
          <div className={styles.readonlyBox}>{submission.student}</div>

          <label className={styles.label} style={{ marginTop: 8 }}>
            Submitted at
          </label>
          <div className={styles.readonlyBox}>{submission.submittedAt}</div>

          <label className={styles.label} style={{ marginTop: 8 }}>
            Grade (out of 100)
          </label>
          <input
            className={styles.gradeInput}
            type="number"
            min={0}
            max={100}
            placeholder="0–100"
            defaultValue={submission.grade}
          />

          <div className={styles.saveWrap}>
            <button className={`${styles.button} ${styles.primary}`} type="button">
              Save grade
            </button>
          </div>
        </div>

        <div className={styles.rightCol}>
          <label className={styles.label}>Solution preview</label>
          <iframe
            className={styles.preview}
            sandbox="allow-scripts allow-same-origin"
            title="solution preview"
            srcDoc={srcDoc}
          />
        </div>
      </div>

      <div className={styles.bottomBar}>
        <button className={styles.button} type="button">
          Back
        </button>
      </div>
    </main>
  );
}