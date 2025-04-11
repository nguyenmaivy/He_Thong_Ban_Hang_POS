
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Register.module.css";

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Kiểm tra mật khẩu trùng khớp
        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }

        // Lấy danh sách người dùng từ localStorage
        const storedUsers = localStorage.getItem("users");
        let users = storedUsers ? JSON.parse(storedUsers) : [];

        // Kiểm tra xem email đã tồn tại chưa
        if (users.some((user: { email: string }) => user.email === email)) {
            alert("Email đã được đăng ký! Vui lòng sử dụng email khác.");
            return;
        }

        // Thêm người dùng mới vào danh sách
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users)); // Lưu lại danh sách
        alert("Đăng ký thành công!");
        router.push("/");
    };

    return (
        // <div className={styles.container}>
        //     <h2>Đăng ký</h2>
        //     <form onSubmit={handleRegister}>
        //         <input
        //             type="email"
        //             placeholder="Email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             required
        //             className={styles.input}
        //         />
        //         <input
        //             type="password"
        //             placeholder="Mật khẩu"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //             required
        //             className={styles.input}
        //         />
        //         <button type="submit" className={styles.button}>
        //             Đăng ký
        //         </button>
        //     </form>
        //     <p>
        //         Đã có tài khoản? <a href="/">Đăng nhập</a>
        //     </p>
        // </div>
        <div className={styles.pageContainer}>
            <form onSubmit={handleRegister} className={styles.registerForm}>
                <h1 className={styles.title}>Đăng ký</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}

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

                <div>
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <button type="submit" className={styles.button}>
                    Đăng ký
                </button>

                <p>
                    Đã có tài khoản?{" "}
                    <Link href="/" className={styles.link}>
                        Đăng nhập ngay
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;