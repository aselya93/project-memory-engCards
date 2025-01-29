import { useState } from "react";
import { message as antMessage, Button } from "antd";
import { useNavigate } from "react-router-dom";
import UserValidator from "../../../../entities/user/api/User.validator";
import { setAccessToken } from "../../../../shared/lib/axiosInstance";
import UserApi from "../../../../entities/user/api/UserApi";

export default function AuthForm({ type, setUser }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: type === "signup" ? "" : undefined,
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeHandler = ({ target }) => {
    setInputs((prev) => ({ ...prev, [target.name]: target.value }));
  };
  async function submitHandler(e) {
    e.preventDefault();
    const { email, password, username } = inputs;
    setLoading(true);
    const normalizedEmail = email.toLowerCase();
    try {
      if (type === "signin") {
        const { isValid, error: validateError } = UserValidator.validateSignIn({
          email: normalizedEmail,
          password,
        });

        if (!isValid) {
          antMessage.error(validateError);
          return;
        }

        const { statusCode, message, data, error } = await UserApi.signIn({
          email: normalizedEmail,
          password,
        });

        if (error) {
          antMessage.error(error);
          return;
        }

        antMessage.success(message);
        if (statusCode === 200) {
          setAccessToken(data.accessToken);
          setUser(data.user);
          setInputs({ email: "", password: "" });
          navigate("/");
        }
      } else {
        const { isValid, validateError } = UserValidator.validateSignUp({
          email: normalizedEmail,
          password,
          username,
        });

        if (!isValid) {
          antMessage.error(validateError);
          return;
        }

        const { statusCode, data, message, error } = await UserApi.signUp({
          email: normalizedEmail,
          password,
          username,
        });

        if (error) {
          antMessage.error(error);
          return;
        }

        antMessage.success(message);
        if (statusCode === 201) {
          setAccessToken(data.accessToken);
          setUser(data.user);
          setInputs({ email: "", password: "", username: "" });
          navigate("/");
        }
      }
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h3> {type === "signin" ? "Вход" : "Регистрация"} </h3>{" "}
      <form onSubmit={submitHandler}>
        <input
          onChange={changeHandler}
          type="email"
          name="email"
          value={inputs.email}
          placeholder="email"
          required
          autoFocus
          autoComplete="email"
        />

        <input
          onChange={changeHandler}
          type="password"
          name="password"
          value={inputs.password}
          placeholder="password"
          required
          autoFocus
        />
        {type === "signup" && (
          <input
            onChange={changeHandler}
            name="username"
            value={inputs.username}
            placeholder="username"
            required
          />
        )}
        <Button type="primary" htmlType="submit" disabled={loading}>
          {type === "signin" ? "Войти" : "Зарегистрироваться"}
        </Button>
      </form>
    </>
  );
}
