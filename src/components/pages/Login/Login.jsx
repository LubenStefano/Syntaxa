import styles from "./Login.module.css";
import flowers from "../../../../assets/flowers.jpg";
import { NavLink } from "react-router";

export default function Login() {
  return (
      <main className={styles.page}>
        <section className={styles.card}>
          <div className={styles.cardLeft}>
            <h1 className={styles.title}>Welcome Back!</h1>
            <p className={styles.subtitle}>Please log in to your account to continue.</p>

            <form className={styles.form}>
              <label className={styles.field}>
                <span>Email address</span>
                <input type="email" placeholder="name@gmail.com" />
              </label>

              <label className={styles.field}>
                <span>Password</span>
                <input type="password" autoComplete="password" placeholder="••••••••" />
              </label>

              <div className={styles.formButtons}>
                <button className={`${styles.btn} ${styles.btnPrimary}`} type="button">
                  Login
                </button>
              </div>
            </form>

            <span className={styles.create}>
              Don't have an account yet? <span className={styles.register}><NavLink to="/register" >Create account</NavLink></span>
            </span>
          </div>

          <div className={styles.cardRight}>
            <img className={styles.hero} src={flowers} alt="Decor" />
          </div>
        </section>
      </main>
  );
}