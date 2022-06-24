import type { NextPage } from 'next'
import { Newsletter } from "../components/Newsletter";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Newsletter />
      </main>
    </div>
  );
};

export default Home
