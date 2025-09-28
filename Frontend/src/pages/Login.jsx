import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../redux/slice/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { Lock, Mail } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();

  const { loading, token, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginAdmin({ email, password })).unwrap();
      toast.success("Login successfull");

      setShowLoader(true);

      setTimeout(() => {
        setShowLoader(false);
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      toast.error("Invalid Credentials!");
    }
  };

  if (loading || showLoader) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Side - Inventory Management Info */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-700 via-gray-800 to-indigo-600 text-white flex-col justify-center items-center p-12 relative">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center max-w-md">
          <img
            src="/logo4.png"
            alt="logo"
            className="w-28 h-28 mx-auto mb-6 drop-shadow-lg"
          />
          <h2 className="text-4xl font-extrabold mb-4">Inventory Management</h2>
          <p className="text-gray-200 leading-relaxed">
            Streamline your stock, track sales, and manage products efficiently
            with our advanced inventory system.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <img src="/logo4.png" alt="IMS logo" className="w-20 h-20 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800">Login</h2>
            <p className="text-gray-500 text-sm mt-1">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="flex items-center gap-3 rounded-lg px-4 py-3 bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500">
              <Mail className="w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full outline-none bg-transparent text-gray-700"
                placeholder="Email address"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 rounded-lg px-4 py-3 bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500">
              <Lock className="w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full outline-none bg-transparent text-gray-700"
                placeholder="Password"
              />
            </div>

            <Button
              size="md"
              type="submit"
              className="w-full py-3 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
            >
              Login
            </Button>
          </form>

          {/* Extra Links */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-2">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
            {/* <a href="#" className="hover:underline">
              Create Account
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
