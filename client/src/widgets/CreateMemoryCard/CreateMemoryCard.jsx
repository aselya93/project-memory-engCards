import React, { useState } from "react";
import { Form, Button } from "antd";
import { message as antMessage } from "antd";
import MemoryCardApi from "../../entities/memoryCard/api/MemoryCardApi";
import styles from "./CreateMemoryCard.module.css"; // Импортируйте ваш файл стилей

function CreateMemoryCard({ user, topicId }) {
  const [newMemoryCard, setNewMemoryCard] = useState({
    englishWord: "",
    russianWord: "",
    isLearned: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); // Состояние для управления отображением формы

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
      
      antMessage.success("Карточка успешно создана");
      // Сбросить форму после успешного создания
      setNewMemoryCard({ englishWord: "", russianWord: "", isLearned: false });
      setShowForm(false); // Закрыть форму после создания
    } catch (error) {
      antMessage.error(`Ошибка при создании карточки: ${error.message}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button className={styles.createButton}  onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Create New Card"}
      </Button>

      {showForm && (
        <div className={styles.formContainer}>
          <h2>Add a new memory card</h2>
          <Form>
            <div className={styles.formField}>
              <label>In english</label>
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

            <div className={styles.formField}>
              <label>In russian</label>
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
              className={styles.submitButton}
              onClick={createMemoryCardHandler}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Card"}
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default CreateMemoryCard;
