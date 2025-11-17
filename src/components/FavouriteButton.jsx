import React from "react";

const FavouriteButton = ({ meal, onToggle, isFav }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // Prevent link click
        onToggle(meal);
      }}
      className={`cursor-pointer absolute right-2 top-2 py-1 px-3 rounded-full 
        ${isFav ? "bg-red-500 text-white" : "bg-white text-gray-700"} 
        text-xl shadow`}
    >
      {isFav ? "♥" : "♡"}
    </button>
  );
};

export default FavouriteButton;
