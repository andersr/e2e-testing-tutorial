import type { NextPage } from "next";
import { NewsletterForm } from "../components/NewsletterForm";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <NewsletterForm />
      </main>
    </div>
  );
};

export default Home;
