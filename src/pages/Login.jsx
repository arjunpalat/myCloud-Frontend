import { useState } from "react";
import { loginUser } from "../utils/queryDB";

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      handleLogin(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">☁️ myCloud</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full mb-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-700">
          No account?{" "}
          <a className="text-blue-500 font-semibold" href="/signup">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
