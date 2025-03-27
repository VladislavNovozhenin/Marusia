import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Genres from './pages/Genres/Genres';
import Genre from './pages/Genre/Genre';
import MoviePage from './pages/MoviePage/MoviePage';
import { useAppDispatch } from './store/hooks';
import 'react-toastify/dist/ReactToastify.css';
import Account from './pages/Account/Account';
import Settings from './pages/Settings/Settings';
import Favorites from './pages/Favorites/Favorites';
import { useLazyProfileQuery } from './services/authService';
import { login } from './store/userSlice';
import styles from './App.module.css';

function App() {
  const dispatch = useAppDispatch();
  const [fetchProfile] = useLazyProfileQuery();
  
  const getProfile = async () => {
    if (localStorage.getItem('auth')) {
      const user = await fetchProfile();
      if (user.data) {
        dispatch(login(user.data));
      }
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
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
