import React, { useState } from "react";
import styles from "./MemoryCard.module.css";

function MemoryCard({ memoryCard, onLearn, learned }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={styles.cardContainer}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}>
        <div className={styles.cardFront}>{memoryCard.englishWord}</div>
        <div className={styles.cardBack}>
          {memoryCard.russianWord}
          {/* Если карточка изучена, показываем текст "Изучено" */}
          {learned && <span className={styles.learnedTag}>Изучено</span>}
          {/* Показываем кнопку "Изучено" только для не изученных карточек */}
          {!learned && (
            <button
              className={styles.learnedButton}
              onClick={(e) => {
                e.stopPropagation();
                onLearn(memoryCard.id); // Помечаем карточку как изученную
              }}
            >
              Изучено
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemoryCard;
