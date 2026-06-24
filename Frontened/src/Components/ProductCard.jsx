// import { useDispatch } from "react-redux";
import { AddItem } from "../Redux/CartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../Api/Service";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, index }) {
  const navigate = useNavigate();
  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
    }
    await api.post("/cart/add", { userId, productId });
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Product added to cart!");
  };

  return (
    <div
      className="border border-gray-300 rounded-xl space-y-1 w-50"
      key={index}>
      <div className="border-b border-gray-300">
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
          className="object-cover w-full h-45 rounded-t-xl"
        />
      </div>

      <div className="p-2 space-y-2">
        <p className="text-gray-500">{product.category}</p>
        <h2 className="h-10">{product.title}</h2>
        <p className="text-gray-500">{product.unit}</p>
        <p className="font-semibold">Rs. {product.price}</p>

        <button
          className="bg-green-600 py-2 w-full rounded-xl flex justify-center items-center gap-2 text-white hover:bg-green-700 cursor-pointer mb-2"
          onClick={() => handleAddToCart(product._id)}>
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
