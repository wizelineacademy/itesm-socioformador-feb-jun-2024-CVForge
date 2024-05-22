import React, { useState } from 'react';
import MainLogo from '@/public/assets/MainLogo'; // Import the MainLogo component

const Register: React.FC= () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the page from refreshing

        if (password!== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        await prisma.users.create({
            data: {
                email: email,
                password: password
            }
        })

        // Reset form after submission
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className='flex items-center justify-center h-screen mx-36'>
            <div className='bg-white shadow-md flex items-between justify-center rounded-lg p-10 w-auto h-auto m-10'>
                <p>back</p>
                <div className='flex flex-col items-center px-10 py-2 pb-6'>
                    <div className='flex w-full justify-start'>
                        <p className='font-koh_santepheap text-5xl text-primarygray pb-6 pt-2'>Create Account</p>
                    </div>
                    <div className='flex flex-row'>
                        {/* first name */}
                        <div className='flex flex-col justify-left pr-6 pb-4'>
                            <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>First Name</p>
                            <input
                                type="text"
                                className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none"
                                placeholder="first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        {/* last name */}
                        <div className='flex flex-col justify-left pb-4'>
                            <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>Last Name</p>
                            <input
                                type="text"
                                className="border-2 border-gptgreen bg-white h-10 px-3 rounded-lg text-md focus:outline-none"
                                placeholder="last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    {/* email */}
                    <div className='flex flex-col justify-left'>
                        <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>Email</p>
                        <input
                            type="email"
                            className="border-2 border-gptgreen bg-white h-10 px-3 pr-60 rounded-lg text-md focus:outline-none"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* password */}
                    <div className='flex flex-col justify-left py-4'>
                        <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>Password</p>
                        <input
                            type="password"
                            className="border-2 border-gptgreen bg-white h-10 px-3 pr-60 rounded-lg text-md focus:outline-none"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* confirm password */}
                    <div className='flex flex-col justify-left'>
                        <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'>Confirm Password</p>
                        <input
                            type="password"
                            className="border-2 border-gptgreen bg-white h-10 px-3 pr-60 rounded-lg text-md focus:outline-none"
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className='p-4'/> {/* spacer */}
                    {/* confirm password */}
                    <button onClick={handleSubmit} className='flex items-center justify-center bg-gradient-to-r from-aiblue to-gptgreen felx-row text-white text-md rounded-3xl p-2.5 w-full'>
                        Create Account
                    </button>  
                </div>
            </div>
            {/* Logo */}
            <div className=' ml-10 w-96 h-96'>
                <MainLogo />
            </div>
        </div>
    );
};

export default Register;
/*
<div className="flex h-screen" style={{backgroundImage: 'url(/assets/bgimg.png)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}>
            <div className="w-1/2 flex justify-center items-center">
                <div style={{ marginLeft: '40px' }}>
                    <MainLogo />
                </div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <form className="text-center">
                <h1 className="text-7xl font-koh_santepheap mb-8 text-primarygray">CVForge<span className="text-gptgreen">.ai</span></h1>
                    <p className="text-left font-inter"> Email</p>
                    <input type="email" placeholder="  Email" className="block w-96 h-12 border bg-transparent border-gradient rounded-md mb-4" />
                    <p className="text-left font-inter"> Password</p>
                    <input type="password" placeholder="  Password" className="block w-96 h-12 bg-transparent border border-gradient rounded-md mb-4" />
                    <a href="#" className="block text-gptgreen mb-4">Forgot password?</a>
                    <button className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-full" style={buttonStyle}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
*/ 