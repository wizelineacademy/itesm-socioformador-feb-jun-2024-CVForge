import React, { useState } from 'react';
import prisma from "@/lib/prisma";
import { createNewUser } from "@/services/userService";
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';
//import bcrypt from 'bcrypt'
import { useRouter } from 'next/navigation';
import { checkIfEmailInUse, getUserIdByEmail } from '@/services/sessionService';
import { signIn } from 'next-auth/react';

const Register: React.FC= () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the page from refreshing

        if (password!== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        //const hashedPassword = await bcrypt.hash(password, 10)

        if ((await checkIfEmailInUse(email)).valueOf()) {
            alert('This email is already in use. Check if you have already logged in with Google or LinkedIn.');
        } else {
            await createNewUser(email, password);
            // Reset form after submission
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            await signIn('credentials', {
                redirect: false,
                email,
                password,
            })
            
            router.push("/cv_gallery");
        }



    };

    return (
        <div className='flex items-center justify-center h-screen w-screen'>
            <div className='bg-white shadow-md flex items-between justify-center rounded-lg w-auto h-auto mx-auto'>
                <div className='flex flex-col'>
                    <Link href={"/login"} className="sticky h-10 flex items-center text-outlinegray hover:text-secondarygray bg-transparent pl-8 pt-8">
                        <IoIosArrowForward className='rotate-180'/>
                        <p className="text-md font-bold font-inter ">Back</p>
                    </Link>
                    <div className='flex flex-col items-center px-20 py-2 pb-6'>
                        <div className='flex w-full justify-center'>
                            <p className='font-koh_santepheap text-5xl p-1 text-primarygray py-3 pt-2'>Create Account</p>
                        </div>
                        <div className='py-4'>
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
                                <p className='text-primarygray font-semibold font-inter text-xs pb-0.5'> Confirm Password</p>
                                <input
                                    type="password"
                                    className="border-2 border-gptgreen bg-white h-10 px-3 pr-60 rounded-lg text-md focus:outline-none"
                                    placeholder="confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button onClick={handleSubmit} className='flex items-center m-4 justify-center bg-gradient-to-r from-aiblue to-gptgreen felx-row text-white text-md rounded-3xl p-2.5 px-16 w-auto delay-50 hover:scale-105 duration-200'>
                            Create Account
                        </button>  
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
/*
        <div className='flex items-center justify-center h-screen mx-36'>
            <div className='bg-white shadow-md flex items-between justify-center rounded-lg p-10 w-auto h-auto m-10'>
                <p>back</p>
                <div className='flex flex-col items-center px-10 py-2 pb-6'>
                    <div className='flex w-full justify-start'>
                        <p className='font-koh_santepheap text-5xl text-primarygray pb-6 pt-2'>Create Account</p>
                    </div>
                    <div className='flex flex-row'>
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
                    <div className='p-4'/> 
                    <button onClick={handleSubmit} className='flex items-center justify-center bg-gradient-to-r from-aiblue to-gptgreen felx-row text-white text-md rounded-3xl p-2.5 w-full'>
                        Create Account
                    </button>  
                </div>
            </div>
            <div className=' ml-10 w-96 h-96'>
                <MainLogo />
            </div>
        </div>
*/ 