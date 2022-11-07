import Head from "next/head";
import AppBar from "./appBar";
import styles from "../styles/Home.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Billboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
