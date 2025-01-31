import React, { useState, useEffect } from "react";
import MemoryCard from "../MemoryCard/MemoryCard";
import MemoryCardApi from "../../entities/memoryCard/api/MemoryCardApi";
import { message as antMessage } from "antd";
import styles from "./MemoryCardList.module.css";
import { useParams } from "react-router-dom";
import CreateMemoryCard from "../CreateMemoryCard/CreateMemoryCard";
import { Progress } from "antd";

function MemoryCardList({ user }) {
  // topicId передаем как пропс
  const [memoryCards, setMemoryCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLearned, setShowLearned] = useState(false); // Флаг для фильтрации изученных
  const [learnedCardIds, setLearnedCardIds] = useState([]); // Массив для хранения id изученных карточек
  const { topicId } = useParams();

  // Загружаем все карточки
  const loadMemoryCards = async () => {
    setLoading(true);
    try {
      const x = await MemoryCardApi.getMemoryCardsByTopic(topicId);
      console.log(666666, x);

      const { data, statusCode, error, message } =
        await MemoryCardApi.getMemoryCardsByTopic(topicId);
      // Передаем topicId в запрос
      if (error) {
        antMessage.error(error);
        return;
      }
      if (statusCode === 200) {
        setMemoryCards(data);
        // Загружаем все карточки
        setFilteredCards(data); // Устанавливаем все карточки
        const learnedCards = data
          .filter((card) => card.isLearned)
          .map((card) => card.id); // Получаем ids изученных карточек
        setLearnedCardIds(learnedCards); // Сохраняем ids изученных карточек
      }

      antMessage.success(message);
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

  // Функция для расчета прогресса
  const calculateProgress = () => {
    const totalCards = memoryCards.length;
    const learnedCards = learnedCardIds.length;
    return ((learnedCards / totalCards) * 100).toFixed(1); // Округляем до 1 знака
  };

  // Функция для отображения прогресса
  const renderProgressBar = () => {
    const progress = calculateProgress();
    return (
      <div className={styles.progressContainer}>
        <Progress
          percent={progress}
          status="active"
          strokeColor="#52c41a" // Зеленый цвет для прогресса
        />
        <span>{`Изучено: ${learnedCardIds.length} из ${memoryCards.length}`}</span>
      </div>
    );
  };

  // Функция для фильтрации карточек (отображать только изученные)
  const handleLearnedToggle = () => {
    setShowLearned((prev) => !prev);
    if (!showLearned) {
      const learnedCards = memoryCards.filter((card) =>
        learnedCardIds.includes(card.id)
      );
      setFilteredCards(learnedCards); // Показываем все карточки
    } else {
      setFilteredCards(memoryCards); // Показываем только изученные
    }
  };

  // Помечаем карточку как изученную
  const onLearn = async (id) => {
    if (!learnedCardIds.includes(id)) {
      setLearnedCardIds((prev) => [...prev, id]); // Добавляем id изученной карточки
      await MemoryCardApi.updateMarkAsLearnedMemoryCard(id); // Обновляем статус карточки на сервере
    }
  };

  return (
    <div>
      <button className={styles.buttonOutline} onClick={handleLearnedToggle}>
        {showLearned ? "Показать все карточки" : "Показать только изученные"}
      </button>

      {showLearned && renderProgressBar()}

      <CreateMemoryCard user={user} topicId={topicId} />

      {loading ? (
        <h4 className={styles.loadingMessage}>Загрузка...</h4>
      ) : filteredCards.length > 0 ? (
        <div className={styles.cardListContainer}>
          {filteredCards.map((memoryCard) => (
            <MemoryCard
              key={memoryCard.id}
              memoryCard={memoryCard}
              onLearn={onLearn}
              learned={learnedCardIds.includes(memoryCard.id)}
            />
          ))}
        </div>
      ) : (
        <h3 className={styles.noCardsMessage}>Карточки не найдены</h3>
      )}
    </div>
  );
}

export default MemoryCardList;
