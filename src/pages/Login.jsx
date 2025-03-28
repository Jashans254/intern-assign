import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/users");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", { email, password });

      localStorage.setItem("token", response.data.token);
      navigate("/users");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f4f7fe] to-[#dce6fd]">
      {/* Background Circular Overlays for Aesthetics */}
      <div className="absolute top-10 left-16 w-60 h-60 bg-blue-400 opacity-20 rounded-full blur-[90px]"></div>
      <div className="absolute bottom-10 right-16 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-[90px]"></div>

      {/* Login Card */}
      <div className="bg-white bg-opacity-70 p-10 rounded-2xl shadow-2xl w-[400px] backdrop-blur-md border border-gray-300">
        <h2 className="text-3xl font-semibold mb-6 text-center text-[#1e3a8a]">
          Sign In to EmployWise
        </h2>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="email"
                className="w-full bg-transparent outline-none text-lg placeholder-gray-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                className="w-full bg-transparent outline-none text-lg placeholder-gray-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-blue-500" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white py-3 rounded-lg font-semibold text-lg hover:shadow-xl transition-transform active:scale-95"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
