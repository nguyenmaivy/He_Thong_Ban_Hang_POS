import React, { useState } from 'react';
import styles from '../styles/login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter from next/router



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Khởi tạo useRouter để điều hướng

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Đăng nhập thất bại!');
      }

      const data = await response.json();
      alert('Đăng nhập thành công!');
      
      // Điều hướng người dùng đến trang menu sau khi đăng nhập thành công
      router.push('/menu'); // Chuyển hướng đến trang menu

    } catch (error) {
      console.error('Lỗi:', error);
      alert('Lỗi đăng nhập. Vui lòng thử lại!');
    }
  };

  return (
    <div className={styles['page-container']}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h1 className={styles.title}>LOGIN</h1>
        {error && <p className={styles.error}>{error}</p>}
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
        <button type="submit">Đăng nhập</button>
        <p>
          Chưa có tài khoản? <Link href="/register">Đăng ký ngay</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
