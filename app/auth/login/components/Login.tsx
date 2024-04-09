import React from 'react';
import MainLogo from '@/public/assets/MainLogo'; // Import the MainLogo component

const Login = () => {
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
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Try CVForge.ai now!</h2>
                    {/* Signup buttons */}
                    <div className="mb-21">
                        <div className="mb-6">
                            <button className="text-gptgreen font-bold border-gradient rounded-full" style={buttonStyle}>
                                <img src="/assets/googleicon.png" className="mr-2" style={iconStyle} /> Sign up with Google
                            </button>
                        </div>
                        <div className="mb-6"> {/* Add margin bottom for spacing */}
                            <button className="text-gptgreen font-bold border-gradient rounded-full" style={buttonStyle}>
                                <img src="/assets/linkedinicon.png" className="mr-2" style={iconStyle} /> Sign up with LinkedIn
                            </button>
                        </div>
                    </div>
                    {/* Line between Sign up with LinkedIn and Create Account */}
                    <div className = "flex"> 
                        <hr className="my-3 w-[80%] border-gray-400 flex"/>
                        <p className = "mx-2">or</p>
                        <hr className="my-3 w-[80%] border-gray-400 flex"/>
                    </div>

                    {/* Create account button */}
                    <div className="mb-6 my-5">
                        <button className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-full mb-4" style={buttonStyle}>
                            Create Account
                        </button>
                    </div>
                    {/* Already have an account? */}
                    <p className="mb-2 my-20">Already have an account?</p>
                    {/* Sign in button */}
                    <button className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-full" style={buttonStyle}>
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
