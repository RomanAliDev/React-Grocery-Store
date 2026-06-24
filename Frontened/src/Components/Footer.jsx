import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
function Footer() {
  return (
    <div className="py-10 bg-gray-800 text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 px-20 gap-5 py-6">
        <div className="space-y-2 mb-2">
          <h2 className="text-xl font-bold mb-4">FreshMart</h2>
          <p>
            Your one-stop shop for fresh groceries delivered to your doorstep.
          </p>
          <p className="font-semibold">Follow Us</p>
          <div className="flex gap-3 text-2xl">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>
        <div className="mb-2">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li className="hover:text-green-400 transition-all cursor-pointer">
              About Us
            </li>
            <li className="hover:text-green-400 transition-all cursor-pointer">
              Contact Us
            </li>
            <li className="hover:text-green-400 transition-all cursor-pointer">
              FAQ
            </li>
            <li className="hover:text-green-400 transition-all cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className="mb-2">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-green-400 transition-all cursor-pointer">
              About Us
            </li>
            <li className="hover:text-green-400 transition-all cursor-pointer">
              Contact Us
            </li>
            <li className="hover:text-green-400 transition-all cursor-pointer">
              FAQ
            </li>
            <li className="hover:text-green-400 transition-all cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className="mb-2">
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p className="mb-2">123 Grocery St, Food City</p>
          <p className="mb-2">Phone: (123) 456-7890</p>
          <p className="mb-2">Email: info@freshmart.com</p>
        </div>
      </div>
      <hr className="mx-20 text-gray-200 border-gray-100" />
      <div className="text-center py-6">
        <h2>© {new Date().getFullYear()} FreshMart. All rights reserved.</h2>
      </div>
    </div>
  );
}

export default Footer;
