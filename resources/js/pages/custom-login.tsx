import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { useAuthStore } from '@/stores/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Mail, Lock, Eye, EyeOff, Heart, Users } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const { login, isLoading, error } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            await login({ email, password });
            
            // Get user data from store after successful login
            const user = useAuthStore.getState().user;
            
            if (user?.role === 'Admin') {
                router.visit('/admin-dashboard');
            } else if (user?.role === 'RM') {
                router.visit('/rm-dashboard');
            } else {
                router.visit('/general-dashboard');
            }
        } catch (err) {
            // Handle validation errors
            if (err instanceof Error) {
                if (err.message.includes('email')) {
                    setErrors({ email: err.message });
                } else if (err.message.includes('password')) {
                    setErrors({ password: err.message });
                } else {
                    setErrors({ email: err.message });
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <Heart className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-white">
                        <h1 className="text-2xl font-bold">Diamond Matrimonial</h1>
                        <p className="text-blue-100 text-sm">Find Your Perfect Match</p>
                    </div>
                </div>
                
                <div className="text-white space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold leading-tight">
                            Welcome to RM Portal
                        </h2>
                        <p className="text-xl text-blue-100">
                            Manage profiles, track candidates, and build meaningful connections
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 pt-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <Users className="h-8 w-8 text-blue-200 mb-2" />
                            <div className="text-2xl font-bold">1,234+</div>
                            <div className="text-blue-100">Active Profiles</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <Heart className="h-8 w-8 text-blue-200 mb-2" />
                            <div className="text-2xl font-bold">856+</div>
                            <div className="text-blue-100">Successful Matches</div>
                        </div>
                    </div>
                </div>
                
                <div className="text-blue-100 text-sm">
                    © 2024 Diamond Matrimonial. All rights reserved.
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <Head title="Login - RM Portal" />
                
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Heart className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Diamond</h1>
                            <p className="text-gray-600 text-sm">Matrimonial</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Sign In
                            </h2>
                            <p className="text-gray-600">
                                Enter your credentials to access the RM Portal
                            </p>
                        </div>
                        
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="pl-10 h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="admin@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    {errors.email && <InputError message={errors.email} />}
                                </div>

                                <div>
                                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            required
                                            className="pl-10 pr-10 h-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && <InputError message={errors.password} />}
                                </div>
                            </div>

                            {error && (
                                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                                    <div className="flex items-center">
                                        <div className="shrink-0">
                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-800">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </form>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Need access?{' '}
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Contact your administrator
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
