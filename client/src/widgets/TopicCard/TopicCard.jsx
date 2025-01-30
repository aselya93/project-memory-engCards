import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TopicCard.module.css";

function TopicCard({ topic }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const topicHandler = () => {
    navigate(`/cards/${topic.id}`);
  };

  return (
    <div
      className={styles.topicCard}
      onClick={topicHandler}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => e.key === "Enter" && topicHandler()}
      tabIndex={0}
    >
      <div className={styles.topicCardHeader}>
        {topic.name}
      </div>
      <div className={styles.topicCardContent}>
        <p>{topic.description}</p>
      </div>
      <div className={styles.topicCardFooter}>
        <span>Перейти к теме</span>
      </div>
    </div>
  );
}

export default TopicCard;
