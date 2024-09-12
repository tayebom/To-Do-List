import React from "react";

const Category = ({ selectedFilter, onCategoryChange }) => {
  const categories = ["All", "Work", "Personal", "Shopping", "Other"];

  return (
    <div className="flex justify-between my-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`flex-1 text-center py-1 font-semibold cursor-pointer 
            ${
              selectedFilter === category
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Category;
