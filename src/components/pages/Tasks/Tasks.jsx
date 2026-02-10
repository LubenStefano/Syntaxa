import { useNavigate } from "react-router";
import styles from "./Tasks.module.css";
import { useTasks } from "../../../hooks/useTasks";
import { useLogos } from "../../../utils/useLogos";

export default function Tasks() {
    const navigate = useNavigate();
    const { tasks, isLoading, error } = useTasks();

    const { getLogoUrl } = useLogos()

    const handleClick = (id) => {
        navigate(`/sandbox/${id}`);
    };

    if (isLoading) return <p>Loading tasks...</p>;
    if (error) return <p>Error loading tasks: {error.message}</p>;

    return (
        <main className={styles.main}>
            <header className={styles.headerSection}>
                <h1 className={styles.pageTitle}>Available Tasks</h1>
                <p className={styles.pageDescription}>
                    Explore the tasks below to enhance your skills. Click on a task to start working on it in the sandbox.
                </p>
            </header>

            {tasks.map((task) => (
                <div key={task.id} className={styles.task} onClick={() => handleClick(task.id)}>
                    <img className={styles.thumb} src={task.thumbUrl} alt="thumb" />

                    <div className={styles.info}>
                        <h1 className={styles.header}>{task.title}</h1>
                        <p className={styles.description}>{task.description}</p>

                        <div className={styles.logos}>
                            {Array.isArray(task.type) ? (
                                task.type.map((tech) => (
                                    <img
                                        key={tech}
                                        className={styles.logo}
                                        src={getLogoUrl(tech)}
                                        alt={tech}
                                    />
                                ))
                            ) : (
                                <img
                                    className={styles.logo}
                                    src={getLogoUrl(task.type)}
                                    alt={task.type}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
}