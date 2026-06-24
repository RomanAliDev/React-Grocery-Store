import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import api from "../../Api/Service";
import { useNavigate } from "react-router";

const CheckOutAddress = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    pinCode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async () => {
    try {
      const isAllEmpty =
        !form.fullName && !form.phone && !form.address && !form.pinCode;

      if (isAllEmpty) {
        navigate("/checkout");
        return;
      }

      const isAnyEmpty =
        !form.fullName || !form.phone || !form.address || !form.pinCode;

      if (isAnyEmpty) {
        alert("Please fill all fields or leave all fields empty.");
        return;
      }

      await api.post("/address/add", {
        ...form,
        userId,
      });

      navigate("/checkout");
    } catch (error) {
      console.log("Save Address:", error);
      alert("Address does not save, try again!");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-2 px-4 pt-24">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaMapMarkerAlt className="text-green-500 text-3xl" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Delivery Address</h1>
            <p className="text-gray-500 text-sm">
              Please enter your delivery details
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-2">
          {Object.keys(form).map((key) => (
            <div key={key}>
              <label className="block mb-1 text-gray-700 capitalize font-medium">
                {key}
              </label>

              <input
                type="text"
                name={key}
                placeholder={`Enter ${key}`}
                value={form[key]}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 mt-6 p-4 rounded-xl border">
          <h2 className="font-semibold text-lg mb-2">Delivery Information</h2>

          <ul className="text-gray-600 text-sm space-y-1">
            <li>✓ Cash on Delivery Available</li>
            <li>✓ Free Delivery</li>
            <li>✓ Fast & Secure Shipping</li>
          </ul>
        </div>

        {/* Button */}
        <button
          onClick={saveAddress}
          className="w-full cursor-pointer mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all shadow-lg">
          Continue to Payment →
        </button>
      </div>
    </div>
  );
};

export default CheckOutAddress;
