import React, { useState } from "react";
import styles from "./MemoryCard.module.css";

function MemoryCard({ user, memoryCard, topicId }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={styles.cardContainer}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}>
        <div className={styles.cardFront}>{memoryCard.englishWord}</div>
        <div className={styles.cardBack}>{memoryCard.russianWord}</div>
      </div>
    </div>
  );
}

export default MemoryCard;





 