import { CiPhone } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { toast } from "react-toastify";
import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="bg-gray-100">
      <div className="pt-25 pb-10 flex md:flex-row flex-col justify-center  items-stretch md:gap-20 gap-10 px-5 ">
        <div className="bg-white lg:w-[35%] md:w-[45%] w-full p-5 space-y-2 rounded-xl shadow-md">
          <h2 className="text-2xl text-green-600 font-bold text-center">
            Contact FreshMart
          </h2>
          <p className="text-center">We would love to hear from you!</p>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              toast.success(" Message sent successfully!");
              setName("");
              setEmail("");
              setMessage("");
            }}
          >
            <div>
              <label htmlFor="name" className="block">
                Name:
              </label>
              <input
                type="text"
                id="name"
                required
                className="border border-gray-400 w-full p-2 rounded-md mb-4"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                required
                className="border border-gray-400 w-full p-2 rounded-md mb-4"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                rows="4"
                className="border border-gray-400 w-full p-2 rounded-md mb-4"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button className="bg-green-600 w-full p-2 rounded-lg text-white font-semibold hover:bg-green-700 cursor-pointer">
              Submit
            </button>
          </form>
        </div>

        <div className="bg-white lg:w-[35%] md:w-[45%] w-full p-5  space-y-5 rounded-xl shadow-md">
          <h2 className="text-2xl text-green-600 font-bold ">
            Contact Information
          </h2>
          <div className="space-y-5">
            <div className="flex items-start ">
              <CiPhone className="h-5 w-5 text-green-600 mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-600">(555) 123-4567</p>
                <p className="text-gray-600">
                  (555) 765-4321 (Customer Service)
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <MdOutlineMailOutline className="h-5 w-5 text-green-600 mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">info@freshmart.com</p>
                <p className="text-gray-600">orders@freshmart.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <IoLocationOutline className="h-5 w-5 text-green-600 mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-gray-600">123 Fresh Avenue</p>
                <p className="text-gray-600">Produce City, PC 12345</p>
              </div>
            </div>

            <div className="flex items-start">
              <CiClock2 className="h-5 w-5 text-green-600 mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Store Hours</h3>
                <div className="grid grid-cols-2 gap-x-4 text-gray-600">
                  <p>Monday - Friday:</p>
                  <p>7:00 AM - 9:00 PM</p>
                  <p>Saturday:</p>
                  <p>8:00 AM - 8:00 PM</p>
                  <p>Sunday:</p>
                  <p>9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
