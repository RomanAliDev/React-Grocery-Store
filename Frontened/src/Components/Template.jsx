import React from "react";
import { Link } from "react-router";

const Template = () => {
  return (
    <section className="py-12 bg-green-50">
      <div className="px-4 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Free Delivery on Your First Order
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Use code FRESH10 at checkout for free delivery on orders over $30
        </p>
        <Link to={"/shop"} className="rounded-xl bg-green-600 hover:bg-green-700 text-white px-3 py-2 cursor-pointer font-semibold">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Template;
