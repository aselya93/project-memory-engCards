import React, { useEffect, useState } from "react";
import { message as antMessage } from "antd";
import TopicApi from "../../entities/topic/api/TopicApi";
import TopicCard from "../TopicCard/TopicCard";

function TopicList({ user }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTopics = async () => {
    setLoading(true);
    try {
      const { data, statusCode, error, message } =
        await TopicApi.getAllTopics();
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
  }, []);

  return (
    <div>
      <div> {loading && <h4> Загрузка...</h4>}</div>

      {topics?.length > 0 ? (
        topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)
      ) : (
        <h3>Темы не найдены </h3>
      )}
    </div>
  );
}

export default TopicList;
