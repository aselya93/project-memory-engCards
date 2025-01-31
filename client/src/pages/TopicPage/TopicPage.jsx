import React from "react";
import styles from "./TopicPage.module.css";
import TopicList from "../../widgets/TopicList/TopicList";

function TopicPage({ user }) {
  return (
    <div className={styles.container}>
      <TopicList user={user} />
    </div>
  );
}

export default TopicPage;
