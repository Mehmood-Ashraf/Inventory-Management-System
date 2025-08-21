import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../redux/slice/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, token, error } = useSelector((state) => state.auth);

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginAdmin({ email, password })).unwrap();
      toast.success("Login successfull");

      setTimeout(() => {
          navigate('/dashboard')
      }, 3000)
    } catch (error) {
      toast.error("Invalid Credentials!");
    }
    // try {
    //   const res = await axios.post(`http://localhost:3000/api/auth/login`, {
    //     email: email,
    //     password: password,
    //   });
    //   console.log(res.data.data.token);
    //   console.log("Email:", email);
    //   console.log("Password:", password);
    //   localStorage.setItem("Token", res.data.data.token)
    // } catch (error) {
    //     console.log(error)
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Inventory Pro - Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
          <a href="#" className="hover:underline">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}
