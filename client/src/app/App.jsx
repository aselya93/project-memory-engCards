import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import MainPage from "../pages/MainPage/MainPage";
import Navigation from "../widgets/Navigation/Navigation";
import { setAccessToken } from "../shared/lib/axiosInstance";
import UserApi from "../entities/user/api/UserApi";
import TopicPage from "../pages/TopicPage/TopicPage";
import CreateMemoryCard from "../widgets/CreateMemoryCard/CreateMemoryCard";
import MemoryCardPage from "../pages/MemoryCardPage/MemoryCardPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserApi.refreshTokens()
      .then(({ error, data, statusCode }) => {
        if (error) {
          setUser(null);
          return;
        }
        if (statusCode === 200) {
          setAccessToken(data.accessToken);
          setUser(data.user);
        }
      })
      .catch(({ message }) => {
        console.log(message);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigation user={user} setUser={setUser} />,
      children: [
        { path: "/", element: <MainPage user={user} /> },
        { path: "/signup", element: <SignUpPage setUser={setUser} /> },
        { path: "/signin", element: <SignInPage setUser={setUser} /> },
        { path: "/topics", element: <TopicPage user={user} /> },
        {
          path: `/topics/:topicId/cards`,
          element: <MemoryCardPage user={user} />,
        },
        {
          path: `/topics/:topicId/cards`,
          element: <CreateMemoryCard user={user} />,
        },

        { path: "/contact", element: <ContactPage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
