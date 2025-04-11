// src/pages/menu.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import Menu from "../components/MenuForm";
import { isAuthenticated } from "../utils/auth"; 

export default function MenuPage() {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/");
        }
    }, [router]);

    return <Menu />;
}