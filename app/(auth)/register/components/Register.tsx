import React from 'react';
import MainLogo from '@/public/assets/MainLogo'; // Import the MainLogo component

const Register = () => {
    // Extracted width and height from the Google button's styles
    const buttonStyle = {
        width: '350px',
        height: '48px',
        display: 'flex',
        alignItems: 'center', // Align items vertically in the button
        justifyContent: 'center', // Align items horizontally in the button
    };

    // Style for the Google icon image
    const iconStyle = {
        width: '24px', // Adjust as needed
        height: '24px', // Adjust as needed
        marginRight: '8px', // Add some spacing between icon and text
    };

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
                <form className="text-center">
                <h1 className="text-7xl font-koh_santepheap mb-8">CVForge<span className="text-gptgreen">.ai</span></h1>
                    <p className="text-left font-inter"> Email</p>
                    <input type="email" placeholder="  Email" className="block w-96 h-12 border bg-transparent border-gradient rounded-md mb-4" />
                    {/* Increased width from w-80 to w-96 */}
                    <p className="text-left font-inter"> Password</p>
                    <input type="password" placeholder="  Password" className="block w-96 h-12 bg-transparent border border-gradient rounded-md mb-4" />
                    {/* Increased width from w-80 to w-96 */}
                    <a href="#" className="block text-gptgreen mb-4">Forgot password?</a>
                    <button className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-full" style={buttonStyle}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
