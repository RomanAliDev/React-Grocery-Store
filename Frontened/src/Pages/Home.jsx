import React from "react";
import Hero from "../Components/Hero";
import Category from "../Components/Category";
import Template from "../Components/Template";
import FeaturedProduct from "../Components/FeaturedProduct";

function Home() {
  return (
    <div>
      <Hero />
      <Category />
      <FeaturedProduct />
      <Template />
    </div>
  );
}

export default Home;
