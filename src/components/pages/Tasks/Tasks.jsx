import { useNavigate } from "react-router";
import styles from "./Tasks.module.css";
import { useTasks } from "../../../hooks/useTasks";
import { useLogos } from "../../../utils/useLogos";
import { Spin } from "antd";

export default function Tasks() {
    const navigate = useNavigate();
    const { tasks, isLoading, error } = useTasks();

    const { getLogoUrl } = useLogos()

    const handleClick = (id) => {
        navigate(`/sandbox/${id}`);
    };

    if (isLoading) {
        return (
            <div style={{ 
                position: "fixed", 
                top: 0, 
                left: 0, 
                width: "100%", 
                height: "100%", 
                backgroundColor: "white", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center" 
            }}>
                <Spin size="large" />
            </div>
        );
    }
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
                            {(() => {
                                let logoUrl = getLogoUrl(task.type);
                                if (task.type === 'all') {
                                    return (
                                        <>
                                            <img
                                                className={styles.logo}
                                                src={getLogoUrl('js')}
                                            />
                                            <img
                                                className={styles.logo}
                                                src={getLogoUrl('css')}
                                            />
                                            <img
                                                className={styles.logo}
                                                src={getLogoUrl('html')}
                                            />
                                        </>
                                    );
                                } else {
                                    return (
                                        logoUrl && (
                                            <img
                                                className={styles.logo}
                                                src={logoUrl}
                                                alt={task.type}
                                            />
                                        )
                                    );
                                }

                            })()}
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
}