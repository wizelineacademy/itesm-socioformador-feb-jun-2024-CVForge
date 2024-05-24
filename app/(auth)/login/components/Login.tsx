import React, { FormEvent, useState } from 'react';
import Google_Icon from '@/public/assets/svg/Google_Icon';
import Linkedin_Icon from '@/public/assets/svg/Linkedin_Icon';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';


const Login: React.FC= () => {
    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password
    const router = useRouter();

    // Function to handle email input change
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    // Function to handle password input change
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // Function to handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            // Handle error (e.g., show a message to the user)
            console.error(result.error);
            alert('Email or Password is not correct.');
        } else {
            // Redirect the user or do something else 
            console.log('Signed in successfully');
            router.push("/cv_gallery");
        }
    };

    return (
        <div className='flex items-center justify-center h-screen w-screen'>
            <div className='bg-white shadow-md flex items-between justify-center rounded-lg w-auto h-auto mx-auto'>
                <div className='flex flex-col pb-8'>
                    <Link href={"/"} className="sticky h-10 flex items-center text-outlinegray hover:text-secondarygray bg-transparent pl-8 pt-8 mr-auto">
                        <IoIosArrowForward className='rotate-180'/>
                        <p className="text-md font-bold font-inter ">Back to Menu</p>
                    </Link>
                    <div className='flex flex-row justify-between p-2 py-4 mx-8'>
                        {/* Left */}
                        <div className='flex flex-col items-center justify-center px-10'>
                            <div className='flex flex-row font-koh_santepheap text-6xl p-1'>
                                <p className='text-primarygray'>CVForge</p>
                                <p className='text-gptgreen'>.ai</p>
                            </div>
                            <p className='text-primarygray font-semibold font-inter text-xl p-4'>Don’t Have an Account?</p>
                            {/* Google */}
                            <button onClick={() => signIn('google', { callbackUrl: "/cv_gallery" })} className='flex felx-row text-gptgreen text-xl border border-gptgreen rounded-3xl p-1.5 border-2 w-72 delay-50 hover:scale-105 duration-200'>
                                <div className='px-3 pl-5'>
                                    <div className='w-7 h-7'>
                                        <Google_Icon/>
                                    </div>
                                </div>
                                Sign up with Google
                            </button>
                            <div className='p-3'/>
                            <button onClick={() => signIn('linkedin', { callbackUrl: "http://localhost:3000/cv_gallery" })} className='flex felx-row text-gptgreen text-xl border border-gptgreen rounded-3xl p-1.5 border-2 w-72 delay-50 hover:scale-105 duration-200'>
                                <div className='px-3 pl-5'>
                                    <div className='w-7 h-7'>
                                        <Linkedin_Icon/>
                                    </div>
                                </div>
                                Sign up with Linkedin
                            </button>      
                            <div className='flex flex-row w-72 items-center justify-center py-2'>
                                <div className='w-full h-0.5 bg-outlinegray mx-2 rounded-lg'></div>  
                                <p className='text-outlinegray'>or</p>
                                <div className='w-full h-0.5 bg-outlinegray mx-2 rounded-lg'></div>  
                            </div>  
                            <Link href={"/register"}>
                            <button className='flex items-center justify-center bg-gradient-to-r from-aiblue to-gptgreen felx-row text-white text-md rounded-3xl p-2.5 w-72 delay-50 hover:scale-105 duration-200'>
                                Create Account
                            </button>  
                            </Link>          
                        </div>
                        {/* Line */}
                        <div className='w-0.5 h-full bg-outlinegray mx-2 rounded-lg'></div>
                        {/* Right */}
                        <div className='flex flex-col items-center justify-center px-10'>
                            <p className='font-koh_santepheap text-5xl p-1 text-primarygray pb-7 pt-2'>Login</p>
                            <div className='flex flex-col justify-left'>
                                <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>Email</p>
                                <input
                                    type="email"
                                    className="border-2 border-gptgreen bg-white h-10 px-3 pr-24 rounded-lg text-md focus:outline-none"
                                    placeholder="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className='p-3'/>{/* spacer */}
                            <div className='flex flex-col justify-left'>
                                <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>Password</p>
                                <input
                                    type="password"
                                    className="border-2 border-gptgreen bg-white h-10 px-3 pr-24 rounded-lg text-md focus:outline-none"
                                    placeholder="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className='flex w-full justify-end py-1'>
                                <p className='flex text-xs text-gptgreen font-inter font-bold underline'>Forgot Password?</p>
                            </div>
                            <div className='p-4'/>{/* spacer */}
                            <form onSubmit={handleSubmit}>
                                <button type="submit" className='flex items-center justify-center bg-gradient-to-r from-aiblue to-gptgreen felx-row text-white text-md rounded-3xl p-2.5 w-72 delay-50 hover:scale-105 duration-200'>
                                    Sign In
                                </button> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
/*



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