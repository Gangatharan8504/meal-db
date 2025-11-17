import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-3">
      <div className="text-center mb-10 mt-3">
        <h1 className="text-2xl md:text-3xl font-semibold text-emerald-900 tracking-tight">
          Browse Meal Categories
        </h1>

        <p className="mt-3 text-lg text-gray-500 font-semibold">
          Discover delicious recipes from around the world
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            to={`/category/${cat.strCategory}`}
            key={cat.idCategory}
            className="group cursor-pointer"
          >
            <img
              src={cat.strCategoryThumb}
              alt={cat.strCategory}
              className="w-full rounded-lg shadow transition-all duration-300 group-hover:shadow-xl group-hover:scale-105"
            />
            <p className="mt-2 text-emerald-800 font-medium text-center">
              {cat.strCategory}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
