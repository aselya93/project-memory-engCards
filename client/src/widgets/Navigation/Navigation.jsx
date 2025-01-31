import React from "react";
import UserApi from "../../entities/user/api/UserApi";
import { message as antMessage, Button } from "antd";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "./Navigation.module.css";
import { Layout } from "antd";
import logo from "../../assets//logo_owl.png";

const { Header } = Layout;

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
    <>
      <Header className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <div className={styles.navbarLinks}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
            {user && (
              <Link to="/topics" className={styles.navLink}>
                Go to topics
              </Link>
            )}
          </div>
          <div className={styles.navbarLinks}>
            <Link to="/">
              <img src={logo} alt="Logo" className={styles.logo} />
            </Link>
          </div>
          {user ? (
            <div className={styles.userSection}>
              <span className={styles.username}>Hi, {user.username}</span>
              <button onClick={signOutHandler} className={styles.navLinkLogOut}>
                Log Out
              </button>
            </div>
          ) : (
            <div className={styles.navbarLinks}>
              <Link to="/signin" className={styles.navLink}>
                Sign In
              </Link>
              <Link to="/signup" className={styles.navLink}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </Header>
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </>
  );
}

export default Navigation;
