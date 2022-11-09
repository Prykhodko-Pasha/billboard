import Head from "next/head";
import AppBar from "./AppBar";
import styles from "../styles/Home.module.css";
import LanguageSwitch from "./LanguageSwitch";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Billboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LanguageSwitch />
      <AppBar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
