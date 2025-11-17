import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import CategoryMeals from "./pages/CategoryMeals";
import MealDetails from "./pages/MealDetails";          // ✅ FIXED
import { FavouritesProvider } from "./contexts/FavouritesContext";
import Favourites from "./pages/Favourites";
import SearchResults from "./pages/SearchResults";   // ✅ FIXED

const App = () => {
  return (
    <BrowserRouter>
      <FavouritesProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CategoryMeals />} />
          <Route path="/meal/:id" element={<MealDetails />} />        {/* FIXED */}
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/search" element={<SearchResults />} />       {/* FIXED */}

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-20 text-5xl text-red-900">
                404 - Not Found
              </h1>
            }
          />
        </Routes>
      </FavouritesProvider>
    </BrowserRouter>
  );
};

export default App;
