import React from "react";
import { Link } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";
import { useFavourites } from "../contexts/FavouritesContext";
   // ✅ FIXED import

const MealCard = ({ meal }) => {
  const { toggle, isFavourite } = useFavourites();
  const fav = isFavourite(meal.idMeal); // ✅ Correct favourite check

  return (
    <div title={meal.strMeal} className="relative">
      
      {/* Favourite Button */}
      <FavouriteButton 
        meal={meal} 
        onToggle={toggle} 
        isFav={fav} 
      />

      {/* Meal Card */}
      <Link
        to={`/meal/${meal.idMeal}`}
        className="block rounded overflow-hidden shadow hover:shadow-lg transition"
      >
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-48 object-cover"
        />

        <div className="p-3 text-center">
          <p className="font-medium text-gray-800 truncate">
            {meal.strMeal}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MealCard;
