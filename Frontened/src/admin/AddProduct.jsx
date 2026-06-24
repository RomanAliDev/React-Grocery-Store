import { useState } from "react";
import api from "../../Api/Service.js";
import { useNavigate } from "react-router";

function AddProduct() {
  //  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    category: "",
    unit: "",
  });

  const navigate = useNavigate();

  // text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // file input
  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("unit", form.unit);

      // IMPORTANT: must match backend multer field name
      formData.append("image", form.image);

      await api.post("/product/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-r from-green-100 to-green-300 p-4 ">
      <div className="bg-white w-full max-w-2xl p-6 md:p-10 rounded-2xl shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-6">
          Add Product
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
            className="border p-2 rounded-lg focus:ring-2 outline-none"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2 outline-none"
          />

          {/* Unit */}
          <input
            type="text"
            name="unit"
            placeholder="Unit (kg/liter/piece)"
            value={form.unit}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2 outline-none"
          />

          {/* Category */}
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
            <option value="Meat">Meat</option>
          </select>

          {/* Image */}
          <input
            type="file"
            name="image"
            onChange={handleFile}
            className="border p-2 rounded-lg md:col-span-2 cursor-pointer"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="border p-2 rounded-lg outline-none md:col-span-2"></textarea>

          {/* Button */}
          <button
            type="submit"
            className="md:col-span-2 bg-green-500 cursor-pointer hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
