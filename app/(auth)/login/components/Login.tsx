import React, { useState } from 'react';
import MainLogo from '@/public/Assets/MainLogo'; 
import Popup from './Popup';
import SecondaryLogo from "@/public/Assets/SecondaryLogo"


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
        <div className='flex items-center justify-center h-screen'>
            <div className='bg-white shadow-md flex items-between justify-center rounded-md p-10'>
                <div className='flex flex-col items-center justify-center'>
                    <div className="w-full h-10"><SecondaryLogo /></div>
                    <p>Don’t Have an Account?</p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <h2>jassa</h2>
                </div>
            </div>
        </div>
    );
};

export default Login;
/*
<div className="flex h-screen" >
            <div className="w-1/2 flex justify-center items-center">
                <div style={{ marginLeft: '40px' }}>
                    <MainLogo />
                </div>
            </div>
            <div className="w-1/2 flex justify-center items-center border border-aibliue">
                <div className="text-center">
                    <h2 className="text-3xl text-inter font-bold mb-4 underline ">Try CVForge.ai now!</h2>
                    <div className="mb-21">
                        <div className="mb-6">
                            <button className="text-gptgreen font-bold border-gradient rounded-lg" style={buttonStyle}>
                                <img src="/assets/googleicon.png" className="mr-2" style={iconStyle} /> Sign up with Google
                            </button>
                        </div>
                            <button className="text-gptgreen font-bold border-gradient rounded-full" style={buttonStyle}>
                                <img src="/assets/linkedinicon.png" className="mr-2" style={iconStyle} /> Sign up with LinkedIn
                            </button>
                        </div>
                    </div>
                    <div className = "flex"> 
                        <hr className="my-3 w-[80%] border-gray-400 flex"/>
                        <p className = "mx-2">or</p>
                        <hr className="my-3 w-[80%] border-gray-400 flex"/>
                    </div>

                    <div className="mb-6 my-5">
                    <button onClick={togglePopup} className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-full mb-4" style={buttonStyle}>                            Create Account
                        </button>
                    </div>
                    <p className="mb-2 my-20 text-inter font-bold">Already have an account?</p>
                    <button className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-full" style={buttonStyle}>
                        Sign In
                    </button>
                </div>
            </div>
            {isPopupVisible && <Popup onClose={togglePopup} />}
        </div>
*/