import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MealCard from "../components/MealCard";

const CategoryMeals = () => {
  const { category } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategoryMeals = async () => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      const data = await res.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.log("Error:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getCategoryMeals();
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">
        Category: <span className="text-emerald-600">{category}</span>
      </h1>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : meals.length === 0 ? (
        <p>No meals found!</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryMeals;
