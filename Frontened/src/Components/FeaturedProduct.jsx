import React from "react";

import img from "../assets/bread.avif";
import ProductCard from "./ProductCard";
// import { products } from "../Utils/Data";
import { Link } from "react-router-dom";
import api from "../../Api/Service.js";

function FeaturedProduct() {
  const [products, setProducts] = React.useState([]);

  const loadProducts = async () => {
    try {
      const res = await api.get("/product");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    loadProducts();
  }, []);
  return (
    <div className="lg:px-10 my-15">
      <h2 className="text-3xl font-bold ps-2 md:ps-10 ">Featured Products</h2>
      <div className="flex justify-center items-center gap-3 flex-wrap mt-10 ">
        {products.slice(0, 5).map((product, index) => {
          return <ProductCard product={product} key={index} />;
        })}
      </div>
      <div className="flex justify-center ">
        <Link to={"/shop"}>
          <p className=" mt-10 border border-gray-400  py-2 px-4  rounded-2xl cursor-pointer shadow-sm ">
            View All Product
          </p>
        </Link>
      </div>
    </div>
  );
}

export default FeaturedProduct;
