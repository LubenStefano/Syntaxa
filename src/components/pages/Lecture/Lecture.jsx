import styles from "./Lecture.module.css";
import { useParams } from "react-router";
import { useLectures } from "../../../hooks/useLectures";
import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import ReactMarkdown from "react-markdown";
import { useLogos } from "../../../utils/useLogos";

export default function Lecture() {
  const { id } = useParams();
  const { fetchSingleLecture } = useLectures();
  const [lecture, setLecture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useUser();
  const { getLogoUrl } = useLogos();

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

  // Handler to open links in a new tab
  function handleOpenLink(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

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
          <span className={styles.creator}>Luben-Stefano</span>
        </div>
      </header>

      <section className={styles.lectureBody}>
        <div className={styles.media}>
          <div className={styles.videoWrap}>
            {user.validated ? (
              <iframe
                className={styles.iframe}
                src={lecture.videoUrl}
                title="YouTube video"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className={styles.iframeEmpty}>
                <img src="/assets/warning.png" alt="warning" />
                <h5>You need to be validated to see the lecture video</h5>
              </div>
            )}
          </div>
        </div>

        <aside className={styles.info}>
          {lecture.resourceLinks && lecture.resourceLinks.length > 0 && (
            <>
              <h3>Additional Info:</h3>
              <ul className={styles.resourceLinks}>
                {lecture.resourceLinks.map((r) => (
                  <li key={r.name}>
                    <a href="#" onClick={() => handleOpenLink(r.url)}>
                      {r.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {lecture.fileLinks && lecture.fileLinks.length > 0 && (
            <>
              <h3>Resources</h3>
              <ul className={styles.fileLinks}>
                {lecture.fileLinks.map((x) => (
                  <li key={x.name}>
                    <a href="#" onClick={() => handleOpenLink(x.url)}>{x.name}</a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {lecture.logos && lecture.logos.length > 0 && (
            <div className={styles.logos} style={{ marginTop: 24 }}>
              {lecture.logos.map((logo, i) => (
                <img key={i} src={getLogoUrl(logo)} className={styles.logo} alt="tech" />
              ))}
            </div>
          )}
        </aside>
      </section>
      <section className={styles.descriptionSection}>
        <ReactMarkdown>{lecture.description}</ReactMarkdown>
      </section>
    </main>
  );
}