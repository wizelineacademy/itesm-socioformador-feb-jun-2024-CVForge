// Login.tsx

import React from 'react';

const Login: React.FC = () => {
    return (
        <div className="flex h-screen" style={{backgroundImage: 'url(bgimg.png)', backgroundSize: 'cover'}}>
            <div className="w-1/2 flex justify-center items-center">
                {/* Left side - Logo */}
                <div>
                    <img src="/CVlogo.png/" alt="Logo" className="w-96 h-auto mb-8" /> {/* Increased width to 48 */}
                </div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                {/* Right side - Login form */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Login</h2>
                    {/* Add your login form here */}
                </div>
            </div>
        </div>
    );
};

export default Login;
