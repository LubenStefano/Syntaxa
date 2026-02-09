import styles from "./Lectures.module.css";
import { useNavigate } from 'react-router';


/* DEMO DATA – later this comes from API */
const lectures = [
    {
        id: 1,
        title: "Conditions & Loops",
        description:
            "Lorum Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, pariatur...",
        thumb:
            "https://codedamn-blog.s3.amazonaws.com/wp-content/uploads/2022/07/16123857/js-loops.png",
        tags: ["Information", "Video", "Resources", "Tasks"],
        logos: [
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
            "data:image/png;base64,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",
        ],
    },
    {
        id: 2,
        title: "Conditions & Loops",
        description:
            "Lorum Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, pariatur...",
        thumb:
            "https://i.pinimg.com/736x/b5/2b/72/b52b72216fc1de8b61d6f8302e1ceb40.jpg",
        tags: ["Information", "Video", "Resources", "Tasks"],
        logos: [
            "data:image/png;base64,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",
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        ],
    },
    {
        id: 3,
        title: "Conditions & Loops",
        description:
            "Lorum Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, pariatur...",
        thumb:
            "https://codedamn-blog.s3.amazonaws.com/wp-content/uploads/2022/07/16123857/js-loops.png",
        tags: ["Information", "Video", "Resources", "Tasks"],
        logos: [
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
            "data:image/png;base64,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",
        ],
    },
    {
        id: 4,
        title: "Conditions & Loops",
        description:
            "Lorum Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, pariatur...",
        thumb:
            "https://i.pinimg.com/736x/b5/2b/72/b52b72216fc1de8b61d6f8302e1ceb40.jpg",
        tags: ["Information", "Video", "Resources", "Tasks"],
        logos: [
            "data:image/png;base64,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",
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        ],
    },
    {
        id: 5,
        title: "Conditions & Loops",
        description:
            "Lorum Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, pariatur...",
        thumb:
            "https://codedamn-blog.s3.amazonaws.com/wp-content/uploads/2022/07/16123857/js-loops.png",
        tags: ["Information", "Video", "Resources", "Tasks"],
        logos: [
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
            "data:image/png;base64,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",
        ],
    },
    {
        id: 6,
        title: "Conditions & Loops",
        description:
            "Lorum Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, pariatur...",
        thumb:
            "https://i.pinimg.com/736x/b5/2b/72/b52b72216fc1de8b61d6f8302e1ceb40.jpg",
        tags: ["Information", "Video", "Resources", "Tasks"],
        logos: [
            "data:image/png;base64,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",
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        ],
    },
];

export default function Lectures() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/lecture")
    };

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
                    onClick={() => handleClick(lecture)}
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
                            <img key={i} src={logo} className={styles.logo} alt="tech" />
                        ))}
                    </div>
                </div>
            ))}
        </main>
    );
}