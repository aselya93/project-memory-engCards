import React from "react";
import UserApi from "../../entities/user/api/UserApi";
import { message as antMessage, Button } from "antd";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Navigation({ user, setUser }) {
  const navigate = useNavigate();

  const signOutHandler = async () => {
    try {
      const { statusCode, message, error } = await UserApi.signOut();
      if (error) {
        antMessage.error(error);
        return;
      }
      antMessage.success(message);
      if (statusCode === 200) {
        setAccessToken("");
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <Button onClick={() => navigate("/")} />
        Главная
      </div>
      <div>
        {user ? (
          <>
            <div>
              <Button onClick={signOutHandler}>Выйти</Button>
            </div>
          </>
        ) : (
          <div>
            <Link to="/signin">
              <Button type="link">Войти</Button>
            </Link>

            <Link to="/signup">
              <Button type="link">Регистрация</Button>
            </Link>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Navigation;
