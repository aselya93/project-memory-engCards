import { Card } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MemoryCard({user, memoryCard, topicId}) {

    const navigate = useNavigate();
    const [isFlipped, setIsFlipped] = useState(false);

    const memoryCardHandler = async () => {
        navigate(`/${topicId}/cards`);
      };

    return (
        <Card onClick={() => setIsFlipped(!isFlipped)}>
    <div>{isFlipped ? memoryCard.russianWord : memoryCard.englishWord}</div>
  </Card>
    );
}

export default MemoryCard;