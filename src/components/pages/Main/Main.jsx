import styles from "./Main.module.css";

import bird from "../../../../assets/bird.png";
import earth from "../../../../assets/earth.png";
import logos from "../../../../assets/logos.png";

export default function Main() {
return (
    <main className={`${styles.main} main-page`}>
        <section className={styles.heroSection}>
            <h1 className={styles.header}>SYNTAXA</h1>

            <img className={styles.mainAsset} src={bird} alt="bird-asset" />

            <div className={styles.boxes}>
                <div className={`${styles.box} ${styles.leftBox}`}>
                    <img className={styles.earth} src={earth} alt="earth-asset" />

                    <div className={styles.leftBoxInfo}>
                        <h2 className={styles.text}>
                            Learn. Practice.<br />
                            Build — <i>Anywhere</i>.
                        </h2>

                        <p className={styles.text}>
                            Watch structured lectures, read clean explanations, and apply concepts immediately.
                            Whether you’re starting with HTML and CSS or sharpening your JavaScript skills,
                            everything is designed to be clear, practical, and reusable.
                        </p>
                    </div>
                </div>

                <div className={`${styles.box} ${styles.rightBox}`}>
                    <img className={styles.logos} src={logos} alt="logos-asset" />

                    <div className={styles.rightBoxInfo}>
                        <h2 className={styles.text}>From Syntax to Skill.</h2>

                        <p className={styles.text}>
                            Each topic comes with examples, tasks, and a sandbox where you can experiment freely
                            — break things, fix them, and actually understand what’s happening.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className={styles.infoSection}></section>
    </main>
);
}