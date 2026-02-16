import React from 'react';
import styles from './NotFound.module.css';
import { useNavigate } from 'react-router';

export default function NotFound() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <main className="not-found-page">
            <section className={styles.hero}>
                <img
                    id="hero-img"
                    className={styles.heroImg}
                    src="/assets/bird.png"
                    alt="Hero image of a parrot"
                />
                <div className={styles['hero-content']}>
                    <h1>
                        <i>Are you lost !?</i>
                        <br /> PAGE NOT FOUND
                    </h1>
                    <p>
                        The page you are looking for does not exist or has been moved.
                    </p>
                    <button onClick={goHome} className={styles.goBackButton}>
                        Go Back Home
                    </button>
                </div>
            </section>
        </main>
    );
}
