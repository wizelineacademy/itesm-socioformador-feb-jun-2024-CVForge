"use client"
import Link from 'next/link';
import SignInOutButton from './SignInOutButton';
import React, { useRef } from 'react';
import useScrollPosition from "@/hooks/useScrollPosition";

const Navbar: React.FC = () => {
    const ulRef = useRef(null);
    const isNearTop = useScrollPosition(ulRef);
    return (
        <div className={`text-normaltext py-7 px-2 bg-white w-full shadow shadow-sm`}>
            <div className='mx-5 flex justify-between items-center'>
                <h1 className='font-koh_santepheap text-4xl font-bold text-primarygray'>
                    CVForge<span className='text-gptgreen'>.ai</span>
                </h1>
                <nav className='hidden md:block'>
                    <ul className='flex gap-6'>
                        <li>
                            <Link href='/' className="text-lg hover:text-gptgreen underline px-4 py-2 text-secondarygray" >Home</Link>
                        </li>
                        <li>
                            <Link href='/editor' className="text-lg hover:text-gptgreen hover:underline px-4 py-2 text-secondarygray" >Editor</Link>
                        </li>
                        <li>
                            <Link href='/cv_gallery' className="text-lg hover:text-gptgreen hover:underline px-4 py-2 text-secondarygray" >CV Gallery</Link>
                        </li>
                    </ul>
                </nav>
                <SignInOutButton/>
            </div>
        </div>
    );
}

export default Navbar;
/*
                <button className="md:hidden bg-gradient-to-r from-gptgreen to-aiblue text-whitefo font-bold py-2 px-4 rounded-3xl">
                    Menu
                </button>
*/