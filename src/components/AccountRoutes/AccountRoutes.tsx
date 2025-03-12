import { Routes, Route } from "react-router-dom";
import Favorites from "../../pages/Favorites/Favorites";
import Settings from "../../pages/Settings/Settings";

const AccountRoutes = () => {
  return (
    <Routes>
      <Route path="favorites" element={<Favorites />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  );
};

export default AccountRoutes;
