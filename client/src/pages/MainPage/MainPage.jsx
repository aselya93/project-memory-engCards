import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Изучаем английский легко!</h1>
        <Button
          type="primary"
          size="large"
          className={styles.mainButton}
          onClick={() => navigate("/topics")}
        >
          Начать сейчас
        </Button>
      </div>

      <div className={styles.animatedSection}>
        <div className={styles.animationContainer}>
          <img src="/client/src/pages/MainPage/css/DALL·E 2025-01-30 18.41.33 - A cute, animated owl character with big eyes, flying or perched on a branch, with soft pastel colors, simple and friendly design, perfect for a fun an.webp" alt="animated owl" className={styles.animatedImage} />
        </div>
        <div className={styles.superDuolingo}>
          <h2>Power up with Super DuoTwingo</h2>
          <p>2 недели бесплатно!</p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
