import React, { useState } from "react";
import { useLogin } from "../../../hooks/useAuth";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { useNotification } from "../../shared/Notification/useNotification";
import styles from "./Login.module.css";
import flowers from "../../../../assets/flowers.jpg";
import { NavLink } from "react-router";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useLogin();
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler(addNotification);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!emailRegex.test(formData.email)) {
      addNotification("error", "Invalid email address.");
      return false;
    }

    if (!passwordRegex.test(formData.password)) {
      addNotification(
        "error",
        "Password must be at least 6 characters long and include at least one uppercase and one lowercase letter."
      );
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(formData.email, formData.password);
    } catch (err) {
      handleError(err, "Login failed."); // Pass all errors to handleError
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.cardLeft}>
          <h1 className={styles.title}>Welcome Back!</h1>
          <p className={styles.subtitle}>Please log in to your account to continue.</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <span>Email address</span>
              <input
                type="email"
                id="email"
                placeholder="name@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className={styles.field}>
              <span>Password</span>
              <input
                type="password"
                id="password"
                autoComplete="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <div className={styles.formButtons}>
              <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit">
                Login
              </button>
            </div>
          </form>

          <span className={styles.create}>
            Don't have an account yet?{" "}
            <span className={styles.register}>
              <NavLink to="/register">Create account</NavLink>
            </span>
          </span>
        </div>

        <div className={styles.cardRight}>
          <img className={styles.hero} src={flowers} alt="Decor" />
        </div>
      </section>
    </main>
  );
}