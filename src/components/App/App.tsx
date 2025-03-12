import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home/Home";
import Genres from "../../pages/Genres/Genres";
import Genre from "../../pages/Genre/Genre";
import styles from "./App.module.css";
import MoviePage from "../../pages/MoviePage/MoviePage";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { fetchAllMovie, fetchProfile } from "../../request";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from "../../pages/Account/Account";
import AccountRoutes from "../AccountRoutes/AccountRoutes";
import Settings from "../../pages/Settings/Settings";
import Favorites from "../../pages/Favorites/Favorites";

function App() {
  const auth = sessionStorage.getItem("auth");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllMovie());
    if (auth === "true") {
      dispatch(fetchProfile());
    }
  }, [dispatch]);
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <div className={styles.app}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/:genre" element={<Genre />} />
              <Route path="/movie/:id" element={<MoviePage />} />
              <Route path="/account" element={<Account />}>
                <Route path="settings" element={<Settings />} />
                <Route path="favorites" element={<Favorites />} />
              </Route>
            </Routes>
          </Layout>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
