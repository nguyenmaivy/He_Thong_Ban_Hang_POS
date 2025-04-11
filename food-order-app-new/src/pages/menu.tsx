// src/pages/menu.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import Menu from "../components/Menu"; // Đường dẫn tương đối từ pages đến components
import { isAuthenticated } from "../utils/auth"; // Đường dẫn tương đối từ pages đến utils

export default function MenuPage() {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/");
        }
    }, [router]);

    return <Menu />;
}