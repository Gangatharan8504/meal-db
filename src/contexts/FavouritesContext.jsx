import { createContext, useContext, useEffect, useState } from "react";

const FavouritesContext = createContext();

const STORAGE_KEY = "mealdb_favourites";

// Load from localStorage
const loadFavouritesFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.log("Error loading favourites:", err);
    return [];
  }
};

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(loadFavouritesFromStorage);

  // Save to localStorage when favourites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.log("Error saving favourites:", err);
    }
  }, [favourites]);

  // Toggle favourite meal
  const toggle = (meal) => {
    setFavourites((prevFavourites) => {
      const exists = prevFavourites.some((m) => m.idMeal === meal.idMeal);

      return exists
        ? prevFavourites.filter((m) => m.idMeal !== meal.idMeal)
        : [...prevFavourites, meal];
    });
  };

  // Check if a meal is favourite
  const isFavourite = (id) =>
    favourites.some((m) => m.idMeal === id);

  return (
    <FavouritesContext.Provider value={{ favourites, toggle, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

// Hook to use favourites
export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error("useFavourites must be used inside FavouritesProvider");
  }

  return context;
};
