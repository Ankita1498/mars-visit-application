import Link from 'next/link';
import styles from '../styles/Home.module.css'; 

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to your SPACE!</h1>
      <Link href="/multi-stage-form" legacyBehavior>
        <a className={styles.button}>Go to Multi-Stage Mars Visit Application Form</a>
      </Link>
    </div>
  );
};

export default Home;
