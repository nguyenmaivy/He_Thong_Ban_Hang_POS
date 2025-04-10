// src/pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css"; // Đường dẫn tương đối từ pages đến styles

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}