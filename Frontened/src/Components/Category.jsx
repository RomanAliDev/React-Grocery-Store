import React from "react";
import fruits from "../assets/fruits.png";
import vegetables from "../assets/vegetabels.png";
import dairy from "../assets/dairy.png";
import bakery from "../assets/bakery.png";
import meat from "../assets/meat.png";
import beverages from "../assets/beverages.png";
import { useNavigate } from "react-router";

const categoryItems = [
  {
    name: "Fruits",
    image: fruits,
  },
  {
    name: "Vegetables",
    image: vegetables,
  },
  {
    name: "Dairy",
    image: dairy,
  },
  {
    name: "Bakery",
    image: bakery,
  },
  {
    name: "Meat",
    image: meat,
  },
  {
    name: "Beverages",
    image: beverages,
  },
];
function Category() {
  const navigate = useNavigate();
  return (
    <div className="text-center my-12">
      <h2 className="text-3xl font-bold">Shop By Category</h2>
      <div className="flex justify-center items-center mt-10 gap-5 flex-wrap px-6">
        {/* Category Items */}
        {categoryItems.map((item, index) => {
          return (
            <div
              className="bg-gray-200 rounded-xl border border-gray-200 hover:shadow-lg hover:scale-105 cursor-pointer duration-300 flex flex-col items-center justify-center"
              key={index}
              onClick={() => navigate(`/shop/${item.name}`)}
            >
              <img src={item.image} alt={item.name} className="sm:w-45 w-30" />
              <h3 className="sm:text-xl font-semibold p-4 bg-gray-50 rounded-b-xl w-full">
                {item.name}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
