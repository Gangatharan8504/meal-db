import React from "react";
import { useFavourites } from "../contexts/FavouritesContext";
import MealCard from "../components/MealCard";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favourites } = useFavourites();

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-emerald-900">
        ❤ Favorite Meals
      </h1>

      {favourites.length === 0 ? (
        <p>
          You haven’t added any favorites yet!{" "}
          <Link to="/" className="text-blue-600 underline">
            Explore meals
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favourites.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
