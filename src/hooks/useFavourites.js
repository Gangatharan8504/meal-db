import { useEffect, useState } from "react";

const STORAGE_KEY = "mealdb_favourites";

// Load favourites from localStorage safely
const loadFavouritesFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.log("Error loading favourites from localStorage", err);
    return [];
  }
};

export default function useFavourites() {
  const [favourites, setFavourites] = useState(loadFavouritesFromStorage);

  // Save favourites to storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.log("Error saving favourites to localStorage", err);
    }
  }, [favourites]);

  // Add/remove favourite
  const toggle = (meal) => {
    setFavourites((prevFavourites) => {
      const exists = prevFavourites.some((m) => m.idMeal === meal.idMeal);

      return exists
        ? prevFavourites.filter((m) => m.idMeal !== meal.idMeal)
        : [...prevFavourites, meal];
    });
  };

  // Check if meal is favourited
  const isFavourite = (mealId) =>
    favourites.some((m) => m.idMeal === mealId);

  return { favourites, toggle, isFavourite };
}
