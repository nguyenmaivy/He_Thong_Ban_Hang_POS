import React, { useState } from 'react';
import styles from '../styles/register.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Đăng ký thất bại');
        return;
      }

      alert('Đăng ký thành công!');
      router.push('/login');
    } catch (error) {
      setError('Lỗi kết nối đến server');
    }
  };

  return (
    <div className={styles['page-container']}>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <h1 className={styles.title}>Đăng ký</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng ký</button>
        <p>
          Đã có tài khoản? <Link href="/login">Đăng nhập ngay</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
