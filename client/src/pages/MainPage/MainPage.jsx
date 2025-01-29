import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Button type="primary" size="large" onClick={() => navigate("/topics")}>
          Изучаем английский легко!
        </Button>
      </div>

      <div></div>
    </div>
  );
}
export default MainPage;
