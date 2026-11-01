import { useState } from "react";
import styles from "./AuthPage.module.css";
import { useAuth } from "./useAuth";

export const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={`${styles.title} serif`}>SonicLore</h1>
        <p className={styles.subtitle}>Explore the conceptual music archive.</p>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder="listener@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.btn} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <span className={styles.forgotText}>Forgot your password?</span>
      </div>
    </div>
  );
};
