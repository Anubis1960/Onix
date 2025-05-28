import React, {useState} from 'react';
import {authService} from '../../service/auth.service';
import {Link, useNavigate} from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate(); // <-- Hook for navigation

    const handleLogin = async (e: React.FormEvent) => {
        console.log('Attempting to login with:', {email, password});

        e.preventDefault();

        try {
            const response = await authService.login(email, password);
            if (response.status !== 200) {
                console.error('Login failed:', response.statusText);
                return;
            }
            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem('accessToken', data.accessToken); // Store token in local storage
            localStorage.setItem('userId', data.user.id); // Store user ID in local storage
            navigate('/dashboard'); // ✅ SPA-friendly redirect
        } catch (err: unknown) {
            console.error('Login error:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};