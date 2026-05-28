"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { startSession } from '../../../utils/adminSession';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true);
      setTimeout(() => {
        startSession();
        router.push('/admin');
      }, 1000);
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="/img/logo.png" style={{ height: '120px', marginBottom: '15px' }} alt="Logo" />

        <div id="loginStep">
            <h1>
                <span className={styles.red}>A</span><span className={styles.blue}>dmin Login</span>
            </h1>

            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Enter password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
        </div>
      </div>
    </div>
  );
}
