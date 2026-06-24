import { useState, useEffect } from "react";
import api from "../../Api/Service";
import { useNavigate } from "react-router";

export default function Checkout() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (!userId) return;

    api.get(`/cart/${userId}`).then((res) => setCart(res.data));

    api.get(`/address/${userId}`).then((res) => {
      setAddresses(res.data);
      if (res.data.length > 0) {
        setSelectedAddress(res.data[0]);
        console.log("SelectAddresses :", res.data[0]);
      }
    });
  }, []);

  if (!cart) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold text-gray-500">
          Loading Checkout...
        </h2>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please select address");
      return;
    }

    try {
      const res = await api.post("/order/place", {
        userId,
        address: selectedAddress,
      });
      window.dispatchEvent(new Event("cartUpdated"));
      console.log(res.data.orderId);
      navigate(`/order-success/${res.data.orderId}`);
    } catch (error) {
      console.log(error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-4 pb-10">
      <div className="max-w-6xl mx-auto">
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* ADDRESS SECTION */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

            {addresses.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg text-gray-500">No Address Found</h3>

                <button
                  onClick={() => navigate("/checkout-address")}
                  className="mt-4 bg-green-500 text-white px-5 py-2 rounded-lg">
                  Add New Address
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((addr) => (
                  <label
                    key={addr._id}
                    className={`block border-2 rounded-xl p-4 cursor-pointer transition-all duration-200
                    ${
                      selectedAddress?._id === addr._id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}>
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress?._id === addr._id}
                      onChange={() => setSelectedAddress(addr)}
                      className="mr-2"
                    />

                    <span className="font-bold text-lg">{addr.fullName}</span>

                    <p className="text-gray-600 mt-2">{addr.pincode}</p>
                    <p className="text-gray-600 mt-2"> {addr.address}</p>

                    <p className="text-gray-500 mt-1">📞 {addr.phone}</p>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-28">
            <h2 className="text-xl font-semibold mb-5">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Products</span>
                <span>{cart.items.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              <div className="flex justify-between">
                <span>Payment Method</span>
                <span>COD</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>Rs {total}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all shadow-lg cursor-pointer">
              Place Order
            </button>

            <p className="text-center text-gray-500 text-sm mt-3">
              🔒 Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
