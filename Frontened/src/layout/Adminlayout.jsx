import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          w-64 bg-gradient-to-b from-green-700 to-green-900 text-white flex flex-col shadow-lg
          fixed  md:sticky top-0 left-0 h-screen   z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
        <div className="p-5 text-2xl font-bold border-b border-green-600">
          🛒 Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-3">
          <Link
            onClick={() => setOpen(false)}
            to="/admin/products"
            className="block px-4 py-2 rounded-lg hover:bg-green-600">
            📦 Product List
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/admin/product/add"
            className="block px-4 py-2 rounded-lg hover:bg-green-600">
            ➕ Add Product
          </Link>

          <Link
            onClick={() => {
              setOpen(false);
              localStorage.clear();
            }}
            to="/"
            className="block px-4 py-2 rounded-lg hover:bg-green-600">
            🌐 Visit Site
          </Link>
        </nav>

        <div className="p-4 border-t border-green-600">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg">
            Logout
          </button>
        </div>
      </aside>

      {/* ================= OVERLAY (mobile only) ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        />
      )}

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col">
        {/* MOBILE TOP BAR ONLY */}
        <div className="md:hidden bg-white shadow px-4 py-3 flex justify-between items-center">
          <h1 className="font-bold text-green-600">Admin Panel</h1>

          <button onClick={() => setOpen(true)} className="text-2xl">
            ☰
          </button>
        </div>

        {/* DESKTOP TOP BAR (unchanged style) */}
        <header className="hidden md:flex bg-white shadow-md px-6 py-4 justify-between items-center">
          <h1 className="text-xl font-bold text-gray-700">Admin Dashboard</h1>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-500">Welcome</p>
              <p className="font-semibold text-green-600">Roman Ali</p>
            </div>

            <div className="w-10 h-10 bg-green-600 text-white flex items-center justify-center rounded-full font-bold">
              R
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* FOOTER (always bottom) */}
        <footer className="bg-white text-center p-3 text-gray-500 text-sm shadow">
          © {new Date().getFullYear()} Admin Dashboard
        </footer>
      </div>
    </div>
  );
}
