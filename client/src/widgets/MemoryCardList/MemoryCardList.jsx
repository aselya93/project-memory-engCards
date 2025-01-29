import React, { useEffect, useState } from "react";
import { message as antMessage } from "antd";
import MemoryCardApi from "../../entities/memoryCard/api/MemoryCardApi";
import MemoryCard from "../MemoryCard/MemoryCard";
import { useParams } from "react-router-dom";

function MemoryCardList({user}) {
  const [memoryCards, setMemoryCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const { topicId } = useParams();

  const loadMemoryCards = async () => {
    setLoading(true);
    try {
      const { data, statusCode, error, message } =
        await MemoryCardApi.getMemoryCardsByTopic(topicId);
      if (error) {
        antMessage.error(error);
        return;
      }
      antMessage.success(message);
      if (statusCode === 200) {
        setMemoryCards(data);
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
    loadMemoryCards();
  }, [topicId]);

  return (
    <div>
      <div> {loading && <h4> Загрузка...</h4>}</div>

      {memoryCards?.length > 0 ? (
        memoryCards.map((memoryCard) => (
          <MemoryCard user={user} key={memoryCard.id} memoryCard={memoryCard} />
        ))
      ) : (
        <h3>Карточки  не найдены </h3>
      )}
    </div>
  );
}

export default MemoryCardList;
