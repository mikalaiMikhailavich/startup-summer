import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import "./App.css";
import FavoritesPage from "./pages/favourites/FavoritesPage";
import SelectedVacancy from "./pages/selectedVacancy/SelectedVacancy";
export type Catalogue = {
  key: number;
  title_trimmed: string;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="favourites" element={<FavoritesPage />} />
        <Route path="favourites/:id" element={<SelectedVacancy />} />
      </Route>
    </Routes>
  );
}

export default App;
