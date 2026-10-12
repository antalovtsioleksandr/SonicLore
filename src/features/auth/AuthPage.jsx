import { useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.css";

export const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={`${styles.logo} serif`}>SonicLore</h1>
        <p className={styles.subtitle}>Explore the conceptual music archive.</p>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input type="email" placeholder="listener@example.com" />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
        </div>

        <button className={styles.btn} onClick={() => navigate("/catalog")}>
          Log In
        </button>
        <span className={styles.forgot}>Forgot your password?</span>
      </div>
    </div>
  );
};
