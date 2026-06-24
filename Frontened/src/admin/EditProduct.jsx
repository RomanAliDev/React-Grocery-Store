import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/Service.js";

const EditProduct = () => {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    unit: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get("/product");
        const product = response.data.find((p) => p._id === id);
        if (!product) {
          return console.log("No Product Find");
        }
        setForm({
          title: product.title,
          description: product.description,
          price: product.price,
          image: product.image,
          category: product.category,
          unit: product.unit,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("unit", form.unit);

      if (form.image) {
        formData.append("image", form.image);
      }
      await api.put(`/product/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/products");
    } catch (error) {
      console.log("Update error:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-300 px-4  ">
      <div className="bg-white w-full max-w-2xl p-6 md:p-10 rounded-2xl shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-6">
          Update Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2  outline-none"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2  outline-none"
          />

          {/* Category */}
          <input
            type="text"
            name="unit"
            placeholder="Unit"
            value={form.unit}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2  outline-none"
          />

          {/* Unit */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none">
            <option value="">Select Category</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Dairy">Dairy</option>
            <option value="Bakery">Bakery</option>
            <option value="Meet">Meet</option>
          </select>

          {/* Image URL */}
          <input
            type="file"
            name="image"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="border p-2 rounded-lg focus:ring-2  outline-none md:col-span-2"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded-lg  outline-none md:col-span-2"
            rows="4"></textarea>

          {/* Button */}
          <button
            type="submit"
            className="md:col-span-2 bg-green-500 hover:bg-green-600 cursor-pointer text-white font-semibold py-2 rounded-lg transition">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditProduct;
