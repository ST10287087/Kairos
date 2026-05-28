"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css';
import { startSession } from '../../../utils/adminSession';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      startSession();
      router.push('/admin');
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleLogin}>
        <img src="/img/logo.png" alt="Kairos Language Institute" />

        <h1>
          <span className={styles.red}>A</span>
          <span className={styles.blue}>dmin Login</span>
        </h1>
        <p className={styles.subtitle}>
          Welcome back. Sign in to manage applications &amp; registrations.
        </p>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@kairos.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <Link href="/" className={styles.backLink}>
          ← Back to website
        </Link>
      </form>
    </div>
  );
}
