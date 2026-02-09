import styles from "./Lecture.module.css";

const lecture = {
  title: "JS WEB | Basic CSS & HTML and JS",
  tags: ["HTML", "CSS", "JS"],
  creator: "Luben-Stefano",
  videoUrl:
    "https://www.youtube.com/embed/2ATgH1JPBbo?rel=0&playsinline=1&enablejsapi=1&autoplay=1",
  overview:
    "This lecture walks you through building a responsive card component using modern CSS. Follow the video and the resources below. Submit the files or try the solution in the sandbox.",
  resources: [
    { label: "sample-image.jpg", href: "../assets/flowers.jpg", download: true },
    { label: "starter-template.zip", href: "#" },
    { label: "Design spec (PDF)", href: "#" },
  ],
  related: [
    { label: "Card with grid layout", href: "#" },
    { label: "Animated hover states", href: "#" },
  ],
  info:
    "Remember to use box-sizing: border-box, set max-widths and use media queries for breakpoints.",
};

export default function Lecture() {
  return (
    <main className={styles.lecturePage}>
      <header className={styles.lectureHeader}>
        <h1>{lecture.title}</h1>

        <div className={styles.lectureMeta}>
          {lecture.tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
          <span className={styles.creator}>{lecture.creator}</span>
        </div>
      </header>

      <section className={styles.lectureBody}>
        <div className={styles.media}>
          <div className={styles.videoWrap}>
            <iframe
              className={styles.iframe}
              src={lecture.videoUrl}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <aside className={styles.info}>
          <h2>Overview</h2>
          <p>{lecture.overview}</p>

          <h3>Files & Resources</h3>
          <ul className={styles.resources}>
            {lecture.resources.map((r) => (
              <li key={r.label}>
                <a href={r.href} download={r.download}>
                  {r.label}
                </a>
              </li>
            ))}
          </ul>

          <h3>Related lectures</h3>
          <ul className={styles.related}>
            {lecture.related.map((x) => (
              <li key={x.label}>
                <a href={x.href}>{x.label}</a>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className={styles.lectureDetails}>
        <h3>Information</h3>
        <p>
          Remember to use <code>box-sizing: border-box</code>, set max-widths and
          use media queries for breakpoints.
        </p>
      </section>
    </main>
  );
}