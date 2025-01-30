import React, { useEffect, useState } from "react";
import { message as antMessage } from "antd";
import TopicApi from "../../entities/topic/api/TopicApi";
import TopicCard from "../TopicCard/TopicCard";
import styles from "./TopicList.module.css";

function TopicList({ user, selectedTopic }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTopics = async () => {
    setLoading(true);
    try {
      const { data, statusCode, error, message } = await TopicApi.getAllTopics();
      if (error) {
        antMessage.error(error);
        return;
      }
      antMessage.success(message);
      if (statusCode === 200) {
        setTopics(data);
      }
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    } finally {
      antMessage.info("Загрузка завершена");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopics();
  }, [selectedTopic]);

  return (
    <div className={styles.container}>
      {loading && <div className={styles.loadingMessage}>Загрузка...</div>}

      {topics?.length > 0 ? (
        <div className={styles.topicList}>
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <div className={styles.noTopicsMessage}>Темы не найдены</div>
      )}
    </div>
  );
}

export default TopicList;
