import { useState } from "react";
import { Link } from "react-router";
import api from "../../Api/Service.js";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/signup", { name, email, password });

      setMessage("User registered successfully!");
      setType("success");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(error?.response?.data?.message || "Signup failed");
      setType("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center p-2 justify-center relative overflow-hidden bg-gradient-to-br from-green-300 via-green-50 to-emerald-200">
      {/* 🌿 BACKGROUND GLOWS */}
      <div className="absolute w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-30 top-[-100px] left-[-100px]"></div>

      <div className="absolute w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-20 bottom-[-120px] right-[-120px]"></div>

      <div className="absolute w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      {/* SIGNUP CARD */}
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-8">
        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-green-600">
          Create Account
        </h2>

        <p className="text-center text-gray-500 text-sm mt-2 mb-6">
          Join us and start shopping fresh products
        </p>

        {/* MESSAGE */}
        {message && (
          <p
            className={`text-center mb-4 text-sm font-medium ${
              type === "success" ? "text-green-500" : "text-red-500"
            }`}>
            {message}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 cursor-pointer text-white font-semibold py-3 rounded-xl transition shadow-md">
            Sign Up
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-500 mt-5 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
