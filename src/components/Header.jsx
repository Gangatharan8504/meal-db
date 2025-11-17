import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="bg-emerald-900 text-white p-4 shadow">
      <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Left side menu */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">MealDB</Link>
          <Link to="/">Categories</Link>
          <Link to="/favourites">Favourites</Link>
        </div>

        {/* Search box */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search meals..."
            className="bg-white px-3 py-1 rounded outline-none text-gray-800 w-48 sm:w-64"
          />
          <button
            type="submit"
            className="bg-white text-emerald-900 px-3 py-1 rounded hover:bg-gray-100"
          >
            Search
          </button>
        </form>

      </nav>
    </header>
  );
};

export default Header;
