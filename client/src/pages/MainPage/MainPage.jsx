import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";
 import animatedOwl from "../../assets/pngwing.com.gif";

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
          <img src={animatedOwl} alt="animated owl" className={styles.animatedImage} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
