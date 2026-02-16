import React, { useState } from "react";
import { useRegister } from "../../../hooks/useAuth";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { useNotification } from "../../shared/Notification/useNotification";
import flowers from "../../../../assets/flowers.jpg";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const { register } = useRegister();
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler(addNotification);
  const navigate = useNavigate();

  const validateForm = () => {
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!nameRegex.test(formData.firstName) || !nameRegex.test(formData.lastName)) {
      addNotification("error", "First and Last Name must contain only letters.");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      addNotification("error", "Invalid email address.");
      return false;
    }

    if (!passwordRegex.test(formData.password)) {
      addNotification("error", "Password must be at least 6 characters long and include at least one uppercase and one lowercase letter.");
      return false;
    }

    if (formData.password !== formData.rePassword) {
      addNotification("error", "Passwords do not match.");
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
      const { ...data } = formData;
      await register(data.email, data.password, {
        firstName: data.firstName,
        lastName: data.lastName,
      });
      addNotification("success", "Registration successful! Redirecting to home page.");
      navigate("/");
    } catch (err) {
        handleError(err, "Registration failed. Please try again.");
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        {/* FORM SIDE */}
        <div className={styles.cardRight}>
          <h1 className={styles.title}>Welcome to Syntaxa!</h1>
          <p className={styles.subtitle}>Please register to continue.</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.names}>
              <label className={styles.field}>
                <span>First Name</span>
                <input
                  type="text"
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className={styles.field}>
                <span>Last Name</span>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

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
                autoComplete="password"
                type="password"
                id="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <label className={styles.field}>
              <span>Repeat Password</span>
              <input
                autoComplete="password"
                type="password"
                id="rePassword"
                placeholder="••••••••"
                value={formData.rePassword}
                onChange={handleChange}
                required
              />
            </label>

            <div className={styles.buttons}>
              <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit">
                Register
              </button>
            </div>
          </form>

          <span className={styles.create}>
            Already have an account? <Link to="/login">Login</Link>
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