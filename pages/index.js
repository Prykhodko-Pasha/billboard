import Head from "next/head";
import AppBar from "../components/AppBar";
import styles from "../styles/Home.module.css";
import { getAllUsers } from "../prisma/user";

export default function Home({ allUsers }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Billboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Billboard!</a>
        </h1>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>{allUsers[0].name}</h2>
            <p>{allUsers[0].email}</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const allUsers = await getAllUsers();
  return {
    props: {
      allUsers: allUsers.map((user) => ({
        ...user,
        createdAt: user.updatedAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      })),
    },
  };
}
