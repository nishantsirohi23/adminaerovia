import React, { useState } from 'react';
import { 
  Lock, User, Eye, EyeOff, ArrowRight,
  Smartphone, Tablet, Laptop, Monitor, Globe 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/admin');
        
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 flex items-center justify-center">
          <Smartphone className="w-4 h-4 md:hidden" />
          <Tablet className="w-4 h-4 hidden md:block lg:hidden" />
          <Laptop className="w-4 h-4 hidden lg:block xl:hidden" />
          <Monitor className="w-4 h-4 hidden xl:block" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 mb-2">
            Aerovia Holidays
          </h1>
          <p className="text-purple-200">Admin Dashboard Portal</p>
        </div>

        <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Welcome Back</h2>

            {error && (
              <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-300">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-700/50 border border-gray-600/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 rounded-lg w-full pl-10 pr-3 py-3 text-white placeholder-gray-400 focus:outline-none transition-all"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700/50 border border-gray-600/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-900 rounded-lg w-full pl-10 pr-10 py-3 text-white placeholder-gray-400 focus:outline-none transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" /> : <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-purple-400 hover:text-purple-300">Forgot password?</a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all duration-300"
                >
                  Sign in <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          <div className="px-8 py-4 bg-gray-800/50 border-t border-gray-700/50 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                Contact administrator
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Aerovia Holidays. All rights reserved.</p>
          <p className="mt-1">Version 2.1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
