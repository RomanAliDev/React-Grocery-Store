import { useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderSuccess() {
  const { id } = useParams();

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4 pt-24 pb-5">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 max-w-lg w-full text-center">
        {/* Success Icon */}
        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-4" />

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-green-600">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mt-3">
          Thank you for your purchase. Your order has been confirmed and is
          being processed.
        </p>

        {/* Order ID */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6">
          <p className="text-gray-600">Order ID</p>
          <h2 className="font-bold text-lg text-green-700 break-all">{id}</h2>
        </div>

        {/* Info */}
        <div className="mt-6 text-left bg-gray-50 rounded-xl p-4">
          <ul className="space-y-2 text-gray-600">
            <li>✅ Order Confirmed</li>
            <li>🚚 Delivery will start soon</li>
            <li>💵 Payment Method: Cash on Delivery</li>
            <li>📦 Track order from your account</li>
          </ul>
        </div>

        {/* Button */}
        <button
          onClick={goHome}
          className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all shadow-lg cursor-pointer">
          Continue Shopping →
        </button>
      </div>
    </div>
  );
}
