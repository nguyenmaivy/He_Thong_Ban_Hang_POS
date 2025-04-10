// src/components/Login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Login.module.css";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Lấy danh sách người dùng từ localStorage
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            const users = JSON.parse(storedUsers);
            // Tìm người dùng với email và mật khẩu khớp
            const user = users.find(
                (user: { email: string; password: string }) =>
                    user.email === email && user.password === password
            );
            if (user) {
                localStorage.setItem("token", "fake-jwt-token");
                router.push("/menu");
            } else {
                alert("Sai email hoặc mật khẩu!");
            }
        } else {
            alert("Tài khoản không tồn tại! Vui lòng đăng ký.");
        }
    };

    return (
        // 
        <div className={styles.pageContainer}>
            <form onSubmit={handleLogin} className={styles.loginForm}>
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
                        className={styles.input}
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
                        className={styles.input}
                    />
                </div>

                <button type="submit" className={styles.button}>
                    Đăng nhập
                </button>

                <p>
                    Chưa có tài khoản?{" "}
                    <Link href="/register" className={styles.link}>
                        Đăng ký ngay
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;