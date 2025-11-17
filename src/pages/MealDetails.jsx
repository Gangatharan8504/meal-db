import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavouriteButton from "../components/FavouriteButton";
import LoadingSpinner from "../components/LoadingSpinner";
import { useFavourites } from "../contexts/FavouritesContext";

const MealDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const { togggle, isFavourite } = useFavourites();

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setMeal(data.meals?.[0] || null);
      } catch (err) {
        console.log("Error fetching meal:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!meal)
    return (
      <p className="text-center text-xl mt-20 text-gray-600">
        Meal not found.
      </p>
    );

  // Extract ingredients + measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) ingredients.push(`${measure} ${ing}`);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl md:text-4xl font-semibold text-emerald-900 text-center mb-8">
        {meal.strMeal}
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full rounded shadow-sm"
          />

          <div className="absolute top-4 right-4">
            <FavouriteButton
              meal={meal}
              onToggle={togggle}
              isFav={isFavourite(meal.idMeal)}
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Tags */}
          <div className="flex gap-4 text-sm">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
              {meal.strArea}
            </span>

            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
              {meal.strCategory}
            </span>
          </div>

          {/* Ingredients */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Ingredients
            </h2>

            <ul>
              {ingredients.map((item, index) => (
                <li key={index} className="flex gap-3 items-center">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* YouTube Link */}
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700 transition"
            >
              Watch Video
            </a>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-emerald-600 mb-6">
          Instructions
        </h2>

        <div className="text-gray-700 leading-relaxed space-y-4">
          <p>{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default MealDetail;
