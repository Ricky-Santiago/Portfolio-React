import Hero from '../../components/Sections/Hero';
import styles from './Home.module.css';

export default function Home() {
  return (
    <main className={styles.homePage}>
      <Hero />
    </main>
  );
}