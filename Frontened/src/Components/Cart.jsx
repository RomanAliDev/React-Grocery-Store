import { GiShoppingBag } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../../Api/Service";

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      if (!userId) return;

      const res = await api.get(`/cart/${userId}`);
      setCart(res.data || { items: [] });
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      await api.post("/cart/delete", {
        userId,
        productId,
      });

      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  const updateQty = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeItem(productId);
        return;
      }

      await api.put("/cart/update", {
        userId,
        productId,
        quantity,
      });
      window.dispatchEvent(new Event("cartUpdated"));
      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  const total =
    cart?.items?.reduce(
      (sum, item) =>
        sum + (item.productId ? item.productId.price * item.quantity : 0),
      0,
    ) || 0;

  const cartCount = cart?.items?.length
    ? cart.items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  useEffect(() => {
    localStorage.setItem("quantity", cartCount);
  }, [cartCount]);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 md:px-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-600">My Cart</h1>

        <Link
          to="/shop"
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg">
          Continue Shopping
        </Link>
      </div>

      {/* Empty Cart */}
      {!cart || cart.items?.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-20">
          <GiShoppingBag className="text-8xl text-gray-300 mb-4" />

          <h2 className="text-2xl font-bold text-gray-600">
            Your Cart is Empty
          </h2>

          <p className="text-gray-400 mt-2">Add some products to your cart</p>

          <Link
            to="/shop"
            className="mt-5 bg-green-500 text-white px-6 py-3 rounded-lg">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 pb-5">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.items
              .filter((item) => item.productId)
              .map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow p-4 flex gap-4 items-center">
                  <img
                    src={`http://localhost:5000/uploads/${item.productId.image}`}
                    alt={item.productId.title}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">
                      {item.productId.title}
                    </h2>

                    <p className="text-green-600 font-medium">
                      Rs {item.productId.price}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          updateQty(item.productId._id, item.quantity - 1)
                        }
                        className="bg-gray-200 px-3 py-1 rounded cursor-pointer">
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQty(item.productId._id, item.quantity + 1)
                        }
                        className="bg-gray-200 px-3 py-1 rounded cursor-pointer">
                        +
                      </button>
                    </div>
                  </div>

                  <MdDelete
                    className="text-red-500 text-2xl cursor-pointer"
                    onClick={() => removeItem(item.productId._id)}
                  />
                </div>
              ))}
          </div>

          {/* Bill Summary */}
          <div className="bg-white rounded-xl shadow p-5 h-fit sticky top-28">
            <h2 className="text-xl font-bold mb-4">Bill Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Items Total</span>
              <span>Rs {total}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Delivery</span>
              <span className="text-green-500">Free</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>Rs {total}</span>
            </div>

            <button
              onClick={() => navigate("/checkout-address")}
              className="w-full cursor-pointer mt-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
