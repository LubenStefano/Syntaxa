import styles from "./Lectures.module.css";
import { useNavigate } from 'react-router';
import { useLectures } from "../../../hooks/useLectures";
import { useLogos } from "../../../utils/useLogos";


export default function Lectures() {
    const navigate = useNavigate();
    const { lectures, isLoading, error } = useLectures();
    const { getLogoUrl } = useLogos();

    console.log(lectures);
    

    const handleClick = (id) => {
        navigate(`/lecture/${id}`)
    };

    if (isLoading) return <p>Loading lectures...</p>;
    if (error) return <p>Error loading lectures: {error.message}</p>;

    return (
        <main className={styles.main}>
            {/* FILTERS – STATIC */}
            <div className={styles.filters}>
                <div className={styles.filtersInner}>
                    <div className={styles.filterGroup}>
                        <strong>Type</strong>
                        <label><input type="checkbox" /> HTML</label>
                        <label><input type="checkbox" /> CSS</label>
                        <label><input type="checkbox" /> JS</label>
                    </div>

                    <div className={styles.filterGroup}>
                        <strong>Content</strong>
                        <label><input type="checkbox" /> Information</label>
                        <label><input type="checkbox" /> Video</label>
                        <label><input type="checkbox" /> Resources</label>
                        <label><input type="checkbox" /> Tasks</label>
                    </div>
                </div>

                <div className={styles.filtersAction}>
                    <button className={styles.button} type="button">
                        Clear filters
                    </button>
                </div>
            </div>

            {/* LECTURES */}
            {lectures.map((lecture) => (
                <div
                    key={lecture.id}
                    className={styles.lecture}
                    onClick={() => handleClick(lecture.id)}
                >
                    <img
                        className={styles.thumb}
                        src={lecture.thumb}
                        alt="lecture thumbnail"
                    />

                    <h1 className={styles.header}>{lecture.title}</h1>

                    <p className={styles.description}>{lecture.description}</p>

                    <ul className={styles.tags}>
                        {lecture.tags.map((tag, i) => (
                            <li key={i} className={styles.tag}>
                                {tag}
                            </li>
                        ))}
                    </ul>

                    <div className={styles.logos}>
                        {lecture.logos.map((logo, i) => (
                            <img key={i} src={getLogoUrl(logo)} className={styles.logo} alt="tech" />
                        ))}
                    </div>
                </div>
            ))}
        </main>
    );
}