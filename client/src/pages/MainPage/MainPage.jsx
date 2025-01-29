import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h1>Игра по флеш-картам</h1>
        <p>Проверь свои знания и улучши навыки!</p>
        <Button type="primary" size="large" onClick={() => navigate("/topics")}>
          Давай поиграем!
        </Button>
      </div>

      <div></div>
    </div>
  );
}
export default MainPage;
