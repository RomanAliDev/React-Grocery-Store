import React, { useEffect } from "react";
// import { products } from "../Utils/Data";
import ProductCard from "../Components/ProductCard";
import { FaFilter } from "react-icons/fa6";
import empty from "../assets/empty.jpg";
import { useParams } from "react-router";
import api from "../../Api/Service.js";

function Shop() {
  const { categoryName } = useParams();
  const [openFilter, setOpenFilter] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [Category, setCategory] = React.useState("");
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [products, setProducts] = React.useState([]);

  const loadProducts = async () => {
    try {
      const res = await api.get("/product");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filterProducts = products.filter(
    (product) =>
      product.title.toLowerCase().startsWith(search.toLowerCase()) &&
      (Category === "" || product.category === Category) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1],
  );

  function toggleFilter() {
    setOpenFilter(!openFilter);
  }

  return (
    <div className="pt-20  md:flex gap-7 lg:px-10 md:px-5 justify-center pb-10">
      <div className="lg:w-[25%] md:w-[30%] bg-gray-200 p-4 hidden md:flex flex-col space-y-4 h mt-10 rounded-xl self-start sticky top-28">
        <h2 className="text-xl font-semibold">Filters</h2>
        <input
          type="text"
          id=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white p-2 rounded-lg"
          placeholder="Search"
        />
        <select
          className="w-full border-2 border-gray-700 p-2 rounded-lg"
          onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Meat">Meat</option>
        </select>
        <div>
          <label htmlFor="PriceRange">
            Price Range: Rs. {priceRange[0]} - Rs. {priceRange[1]}
          </label>
          <br />
          <input
            type="range"
            id="PriceRange"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>
        <button
          className="bg-red-500 px-4 py-2 rounded-lg text-white cursor-pointer"
          onClick={() => {
            setCategory("");
            setSearch("");
            setPriceRange([0, 1000]);
          }}>
          Reset Filter
        </button>
      </div>

      {/* Mobile filter */}
      <div
        className={`flex justify-between items-center bg-gray-200 mx-4 mt-10 p-2  shadow-md md:hidden   ${
          openFilter ? "rounded-t-md" : "rounded-md"
        }`}>
        <h1 className="text-xl font-semibold">Filters</h1>
        <FaFilter className="cursor-pointer" onClick={toggleFilter} />
      </div>
      {openFilter ? (
        <div className=" bg-gray-200 p-4 space-y-4  mx-4  self-start  md:hidden rounded-b-md ">
          <input
            type="text"
            id=""
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="w-full bg-white p-2 rounded-lg"
            placeholder="Search"
          />
          <select
            className="w-full border-2 border-gray-700 p-2 rounded-lg"
            onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Bakery">Bakery</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Meat">Meat</option>
          </select>
          <div>
            <label htmlFor="PriceRange">
              Price Range: Rs. {priceRange[0]} - Rs. {priceRange[1]}
            </label>
            <br />
            <input
              type="range"
              id="PriceRange"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
          </div>
          <button className="bg-red-500 px-4 py-2 rounded-lg text-white cursor-pointer duration-300 transition-all ">
            Reset Filter
          </button>
        </div>
      ) : null}

      {filterProducts.length > 0 ? (
        <div className="flex  items-center gap-3 flex-wrap justify-center  mt-10 mx-1 md:w-[70%]">
          {filterProducts.map((product, index) => {
            return <ProductCard product={product} index={index} />;
          })}
        </div>
      ) : (
        <div className="md:w-[70%] flex justify-center items-center gap-3">
          <img src={empty} alt="" className="md:w-96 w-52" />
        </div>
      )}
    </div>
  );
}

export default Shop;
