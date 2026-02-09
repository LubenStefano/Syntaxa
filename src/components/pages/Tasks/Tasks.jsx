import { useNavigate } from "react-router";
import styles from "./Tasks.module.css";


const tasks = [
    {
        id: 1,
        title: "Conditions & Loops",
        description:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum adipisci possimus nesciunt neque mollitia molestias deleniti illum reprehenderit. Beatae quod repudiandae labore, consequatur adipisci eius velit qui harum incidunt totam!",
        thumb:
            "https://codedamn-blog.s3.amazonaws.com/wp-content/uploads/2022/07/16123857/js-loops.png",
        logos: [
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        ],
    },
    {
        id: 2,
        title: "DOM Basics",
        description:
            "Learn how to select elements, handle events, and manipulate the DOM safely and cleanly.",
        thumb:
            "https://codedamn-blog.s3.amazonaws.com/wp-content/uploads/2022/07/16123857/js-loops.png",
        logos: [
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        ],
    },
    {
        id: 3,
        title: "Flexbox Layout",
        description:
            "Build responsive layouts using flex containers, alignment, and spacing patterns used in real projects.",
        thumb:
            "https://codedamn-blog.s3.amazonaws.com/wp-content/uploads/2022/07/16123857/js-loops.png",
        logos: [
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        ],
    },
    {
        id: 4,
        title: "CSS Grid Practice",
        description:
            "Grid fundamentals: tracks, areas, responsive columns, and typical UI layouts.",
        thumb:
            "https://codedamn-blog.s3.amazonaws.com/wp-content/uploads/2022/07/16123857/js-loops.png",
        logos: [
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        ],
    },
];

export default function Tasks() {
    const navigate = useNavigate();

    const handleClick = (id) => {
        console.log(id);
        
        navigate(`/sandbox/${id}`)
    };
    return (
        <main className={styles.main}>
            {tasks.map((task) => (
                <div key={task.id} className={styles.task} onClick={() => handleClick(task.id)}>
                    <img className={styles.thumb} src={task.thumb} alt="thumb" />

                    <div className={styles.info}>
                        <h1 className={styles.header}>{task.title}</h1>
                        <p className={styles.description}>{task.description}</p>

                        <div className={styles.logos}>
                            {task.logos.map((logo, i) => (
                                <img key={i} className={styles.logo} src={logo} alt="tech" />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
}