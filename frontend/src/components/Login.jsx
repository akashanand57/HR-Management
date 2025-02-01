import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../public/Logo.png';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      toast.success('Login successful!');
      setTimeout(() => {
        onLogin();
        navigate('/dashboard');
      }, 2000);
    } else {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <div className="text-center ">
            <img src={logo} alt="Logo" className="h-12 mx-auto" />
          </div>
    
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-lg rounded-xl flex w-3/4 overflow-hidden">
        <div className="w-1/2 bg-purple-700 text-white flex flex-col justify-center p-8">
          <img src="../../public/Rectangle 77.png" alt="Dashboard Preview" className="rounded-lg mb-4" />
          <h2 className="text-lg font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
          <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.</p>
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center">
          
          <h2 className="text-2xl font-bold mb-4 text-purple-700">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded pr-10"
                required
              />
              <span 
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="w-full p-3 bg-purple-700 text-white rounded-lg font-bold">
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account? <Link to="/register" className="text-purple-700 font-bold">Register</Link>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
    </div>
  );
};

export default Login;
