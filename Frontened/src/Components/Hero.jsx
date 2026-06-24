import heroImage from "../assets/Hero1.png";
import { Link } from "react-router";

function Hero() {
  return (
    <div
      className=" bg-green-600 w-full
  flex flex-col md:flex-row
  justify-center items-center
  gap-6 px-6 py-6 md:px-10
  pt-32 md:pt-28 text-center md:text-left"
    >
      <div className="md:w-[60%] lg:w-1/2 text-white flex flex-col gap-7">
        <h1 className="text-4xl lg:text-5xl font-bold ">
          Fresh <span className="text-orange-300"> Groceries </span> Delivered
          to Your Door
        </h1>
        <p className="lg:text-lg">
          Shop from our wide selection of fresh fruits, vegetables, dairy, and
          more. Get same-day delivery!
        </p>
        <div>
          <Link to={"/shop"} className="bg-white text-green-500 py-2 px-4 rounded-lg hover:border hover:text-white hover:bg-green-500 border-white font-semibold  cursor-pointer mr-5">
            Shop Now
          </Link>
          <Link to={"/about"} className="bg-green-800 text-white py-2 px-4 rounded-lg  font-semibold  cursor-pointer hover:bg-green-700">
            Learn More
          </Link>
        </div>
      </div>
      <div className="bg-green-400 rounded-xl">
        <img src={heroImage} alt="" />
      </div>
    </div>
  );
}

export default Hero;
