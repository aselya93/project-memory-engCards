import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { message as antMessage, Button } from "antd";
import MemoryCardApi from "../../entities/memoryCard/api/MemoryCardApi";

function CreateMemoryCard({ user, topicId }) {
  const [newMemoryCard, setNewMemoryCard] = useState({
    englishWord: "",
    russianWord: "",
    isLearned: false,
  });
  const [createMemoryCard, setCreateMemoryCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function createMemoryCardHandler() {
    if (!user) {
      antMessage.error("У вас нет прав");
      return;
    }
    setLoading(true);
    try {
      const response = await MemoryCardApi.createMemoryCard(topicId, {
        ...newMemoryCard,
        userId: user.id,
      });
      
      setCreateMemoryCard(response.data);
      antMessage.success("Карточка успешно создана");
      // navigate(`/cards/${topicId}`);
    } catch (error) {
      antMessage.error(`Ошибка при создании карточки: ${error.message}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <h2>Создать новую карточку</h2>
      {!createMemoryCard && (
        <Form>
          <div>
            <label> in english </label>
            <input
              type="text"
              value={newMemoryCard.englishWord}
              onChange={(e) =>
                setNewMemoryCard({
                  ...newMemoryCard,
                  englishWord: e.target.value,
                })
              }
              required
            />
          </div>

          <div>
            <label> in russian </label>
            <input
              type="text"
              value={newMemoryCard.russianWord}
              onChange={(e) =>
                setNewMemoryCard({
                  ...newMemoryCard,
                  russianWord: e.target.value,
                })
              }
              required
            />
          </div>

          <Button
            type="button"
            onClick={createMemoryCardHandler}
            disabled={loading}
          >
            {loading ? "Создание..." : "Создать карточку"}
          </Button>
        </Form>
      )}
    </div>
  );
}

export default CreateMemoryCard;
