import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../../Api/Service";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const getProducts = async () => {
    try {
      const res = await api.get("/product");
      // console.log(res.data);

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:p-10 ">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 pt-12">
        <h1 className="text-2xl md:text-3xl font-bold text-green-600">
          Product List
        </h1>

        <Link
          to="/admin/product/add"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow">
          + Add Product
        </Link>
      </div>

      {/* ================= TABLE (DESKTOP) ================= */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full min-w-[700px]">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Unit</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>

                <td className="p-3 font-medium">{product.title}</td>
                <td className="p-3">Rs {product.price}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">{product.unit}</td>

                <td className="p-3 text-center space-x-2">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden grid gap-4 ">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-xl shadow">
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              className="w-full h-40 object-cover rounded mb-3"
            />

            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-600">Rs {product.price}</p>
            <p className="text-gray-500">
              {product.category} | {product.value} {product.unit}
            </p>

            <div className="flex gap-2 mt-3">
              <Link
                to={`/admin/products/edit/${product._id}`}
                className="flex-1 bg-blue-500 text-white py-2 rounded text-center cursor-pointer">
                Edit
              </Link>

              <button
                onClick={() => deleteProduct(product._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
