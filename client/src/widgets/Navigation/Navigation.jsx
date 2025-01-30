import React from "react";
import UserApi from "../../entities/user/api/UserApi";
import { message as antMessage, Button } from "antd";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "./Navigation.module.css";
import { Header } from "antd/es/layout/layout";

function Navigation({ user, setUser }) {
  const navigate = useNavigate();
  const { topicId } = useParams();

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
    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
      <Header>
        <div className={styles.navbarLinks}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>

          {user ? (
            <div className={styles.userSection}>
              <span className={styles.username}>Welcome, {user.username}</span>
              <Link to="/createMemoryCardByTopicId" className={styles.navLink}>
                <Button type="primary">Add New Word</Button>
              </Link>
              <Button onClick={signOutHandler} className={styles.logoutButton}>
                Log Out
              </Button>
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link to="/signin" className={styles.navLink}>
                <Button type="link">Sign In</Button>
              </Link>
              <Link to="/signup" className={styles.navLink}>
                <Button type="link">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </Header>
      <Outlet />
    </div>
  );
}

export default Navigation;
