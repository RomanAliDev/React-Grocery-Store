import { FaLeaf } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { FiTruck } from "react-icons/fi";
import FreshMart from "../assets/FreshMart.jpg";

const values = [
  {
    title: "Freshness",
    para: "We're committed to providing the freshest produce and products, sourced locally whenever possible.",
    logo: <FaLeaf className="h-8 w-8" />,
  },
  {
    title: "Quality",
    para: "We carefully select every product on our shelves to ensure the highest quality for our customers.",
    logo: <MdOutlineShoppingBag className="h-8 w-8" />,
  },
  {
    title: "Community",
    para: "We're proud to support local farmers, producers, and community initiatives in every neighborhood we serve.",
    logo: <FaRegHeart className="h-8 w-8" />,
  },
  {
    title: "Sustainability",
    para: "We're committed to environmentally friendly practices and reducing our carbon footprint.",
    logo: <FiTruck className="h-8 w-8" />,
  },
];

function About() {
  return (
    <div className="bg-gray-100">
      <div className="pt-20 xl:px-25 lg:px-15 md:px-10 px-5">
        <div className="text-center pt-10 ">
          <h2 className="text-4xl font-bold text-green-700">About FreshMart</h2>
          <p className="text-xl text-gray-600 pt-3">
            Your neighborhood grocery store committed to providing fresh,
            quality products since 2005.
          </p>
        </div>

        <div className="flex md:flex-row flex-col justify-center items-center gap-7 mt-20">
          <div className="md:w-1/2 space-y-4 text-gray-600">
            <h2 className="text-green-500 text-3xl font-semibold">Our Story</h2>
            <p>
              FreshMart began with a simple idea: to create a grocery store that
              offers the freshest produce, highest quality meats, and finest
              selection of everyday essentials at fair prices.
            </p>
            <p>
              Founded in 2005 by the Johnson family, our first store opened in
              Grocery City with just 15 employees. Today, we've grown to 25
              locations across the state, but our commitment to quality and
              community remains unchanged.
            </p>
            <p>
              We work directly with local farmers and producers to bring you the
              best products while supporting our local economy. Our team members
              are passionate about food and dedicated to providing exceptional
              customer service.
            </p>
          </div>
          <div className="md:w-[45%]">
            <img src={FreshMart} alt="FreshMart" className="rounded-xl" />
          </div>
        </div>

        <div>
          <h2 className="text-center mt-20 text-3xl font-semibold text-green-600">
            Our Value
          </h2>
          <div className="grid lg:grid-cols-4 grid-cols-2 items-stretch gap-5  mt-10 ">
            {values.map((value, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center gap-3 p-4 border border-t-4 border-green-500 rounded-md"
                >
                  <div className="bg-green-100 rounded-full p-3 text-green-600">
                    {value.logo}
                  </div>
                  <div className="md:text-xl font-semibold">{value.title}</div>
                  <div className="text-gray-500">{value.para}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="py-20 text-center space-y-4">
          <h2 className="text-2xl text-green-500 font-semibold">
            Join the FreshMart Family
          </h2>
          <p className="text-gray-500">
            We're always looking for passionate individuals to join our team.
            Check out our current openings!
          </p>
          <button className="bg-green-600 py-3 px-5 rounded-xl text-white  font-semibold hover:bg-green-700 cursor-pointer">
            View Career Opportunities
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
