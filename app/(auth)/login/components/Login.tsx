import React, { useState } from 'react';
import MainLogo from '@/public/assets/MainLogo'; 
import Popup from './Popup';

const Login: React.FC= () => {

    const [isPopupVisible, setPopupVisible] = useState(false); 

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };
    const buttonStyle = {
        width: '350px',
        height: '48px',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
    };

    
    const iconStyle = {
        width: '24px', 
        height: '24px', 
        marginRight: '8px',
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
                    <h2 className="text-3xl text-inter font-bold mb-4 underline ">Try CVForge.ai now!</h2>
                    {/* Signup buttons */}
                    <div className="mb-21">
                        <div className="mb-6">
                            <button className="text-gptgreen font-bold border-gradient rounded-lg" style={buttonStyle}>
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
                    <button onClick={togglePopup} className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-full mb-4" style={buttonStyle}>                            Create Account
                        </button>
                    </div>
                    {/* Already have an account? */}
                    <p className="mb-2 my-20 text-inter font-bold">Already have an account?</p>
                    {/* Sign in button */}
                    <button className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-full" style={buttonStyle}>
                        Sign In
                    </button>
                </div>
            </div>
            {isPopupVisible && <Popup onClose={togglePopup} />}
        </div>
    );
};

export default Login;
