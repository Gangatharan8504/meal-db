import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import CategoryMeals from "./pages/CategoryMeals";
import MealDetails from "./pages/MealDetails";
import Favourites from "./pages/Favourites";
import SearchResults from "./pages/SearchResults";

import { FavouritesProvider } from "./contexts/FavouritesContext";

function App() {
  return (
    <BrowserRouter>
      <FavouritesProvider>
        <div className="min-h-screen bg-orange-50">
          <Header />

          <main className="pt-4">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/category/:category"
                element={<CategoryMeals />}
              />

              <Route
                path="/meal/:id"
                element={<MealDetails />}
              />

              <Route
                path="/favourites"
                element={<Favourites />}
              />

              <Route
                path="/search"
                element={<SearchResults />}
              />

              <Route
                path="*"
                element={
                  <div className="flex items-center justify-center min-h-[70vh]">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-red-700">
                        404
                      </h1>
                      <p className="mt-3 text-2xl font-semibold text-gray-800">
                        Page Not Found
                      </p>
                      <a
                        href="/"
                        className="inline-block mt-6 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
                      >
                        Go Home
                      </a>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </FavouritesProvider>
    </BrowserRouter>
  );
}

export default App;
