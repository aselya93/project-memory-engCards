import React from "react";
import MemoryCardList from "../../widgets/MemoryCardList/MemoryCardList";
import styles from "./MemoryCardPage.module.css";

function MemoryCardPage({ user }) {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Учите английский легко! 🇬🇧✨</h1>
      <p className={styles.description}>
        Практикуйтесь каждый день и отмечайте изученные слова!
      </p>
      <div className={styles.cardContainer}>
        <MemoryCardList user={user} />
      </div>
    </div>
  );
}

export default MemoryCardPage;
