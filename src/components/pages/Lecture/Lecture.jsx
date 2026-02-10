import styles from "./Lecture.module.css";
import { useParams } from "react-router";
import { useLectures } from "../../../hooks/useLectures";
import { useEffect, useState } from "react";

export default function Lecture() {
  const { id } = useParams();
  const { fetchSingleLecture } = useLectures();
  const [lecture, setLecture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLecture = async () => {
      try {
        const data = await fetchSingleLecture(id);
        if (data.videoUrl && !data.videoUrl.startsWith("https://www.youtube.com/embed/")) {
          data.videoUrl = `https://www.youtube.com/embed/${data.videoUrl}`;
        }
        setLecture(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLecture();
  }, [id, fetchSingleLecture]);

  if (isLoading) return <p>Loading lecture...</p>;
  if (error) return <p>Error loading lecture: {error.message}</p>;
  if (!lecture) return <p>No lecture found.</p>;

  return (
    <main className={styles.lecturePage}>
      <header className={styles.lectureHeader}>
        <h1>{lecture.title}</h1>

        <div className={styles.lectureMeta}>
          {lecture.tags?.map((t) => (
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
            {lecture.resources?.map((r) => (
              <li key={r.label}>
                <a href={r.href} download={r.download}>
                  {r.label}
                </a>
              </li>
            ))}
          </ul>

          <h3>Related lectures</h3>
          <ul className={styles.related}>
            {lecture.related?.map((x) => (
              <li key={x.label}>
                <a href={x.href}>{x.label}</a>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}