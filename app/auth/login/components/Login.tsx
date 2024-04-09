import React from 'react';
import MainLogo from '@/public/assets/MainLogo'; // Import the MainLogo component

const Login: React.FC = () => {
    return (
        <div className="flex h-screen" style={{backgroundImage: 'url(/assets/bgimg.png)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}>
            <div className="w-1/2 flex justify-center items-center">
                {/* Left side - Logo */}
                <div style={{ marginLeft: '40px' }}>
                    <MainLogo />
                </div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                {/* Right side - Login form */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Try CVForge.ai now!</h2>
                    {/* Signup buttons */}
                    <div className="mb-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 block">
                            Sign up with Google
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block">
                            Sign up with LinkedIn
                        </button>
                    </div>
                    {/* Create account button */}
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-4 block">
                        Create Account
                    </button>
                    {/* Already have an account? */}
                    <p className="mb-4">Already have an account?</p>
                    {/* Sign in button */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
