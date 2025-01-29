import { Card } from "antd";
import React, { useState } from "react";
import styles from "./MemoryCard.module.css";

function MemoryCard({ user, memoryCard, topicId }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`}>
      <div className={styles.cardFront}>{memoryCard.englishWord}</div>
      <div className={styles.cardBack}>{memoryCard.russianWord}</div>
    </div>
  );
}

export default MemoryCard;
