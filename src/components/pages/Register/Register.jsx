import styles from "./Register.module.css";
import flowers from "../../../../assets/flowers.jpg";

export default function Register() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        {/* FORM SIDE */}
        <div className={styles.cardRight}>
          <h1 className={styles.title}>Welcome to Syntaxa!</h1>
          <p className={styles.subtitle}>Please register to continue.</p>

          <form className={styles.form}>
            <div className={styles.names}>
              <label className={styles.field}>
                <span>First Name</span>
                <input type="text" placeholder="John" />
              </label>

              <label className={styles.field}>
                <span>Last Name</span>
                <input type="text" placeholder="Doe" />
              </label>
            </div>

            <label className={styles.field}>
              <span>Email address</span>
              <input type="email" placeholder="name@gmail.com" />
            </label>

            <label className={styles.field}>
              <span>Password</span>
              <input autoComplete="password" type="password" placeholder="••••••••" />
            </label>

            <label className={styles.field}>
              <span>Repeat Password</span>
              <input autoComplete="password" type="password" placeholder="••••••••" />
            </label>

            <div className={styles.buttons}>
              <button className={`${styles.btn} ${styles.btnPrimary}`} type="button">
                Register
              </button>
            </div>
          </form>

          <span className={styles.create}>
            Already have an account? <span className={styles.login}>Login</span>
          </span>
        </div>

        {/* IMAGE SIDE */}
        <div className={styles.cardLeft}>
          <img className={styles.hero} src={flowers} alt="Decor" />
        </div>
      </section>
    </main>
  );
}