"use client"
import Link from 'next/link';
import SignInOutButton from './SignInOutButton';
import React, { useRef } from 'react';
import useScrollPosition from "@/hooks/useScrollPosition";

const Navbar: React.FC = () => {
    const ulRef = useRef(null);
    const isNearTop = useScrollPosition(ulRef);
    return (
        <div className={`text-inter py-5 px-2 bg-white w-full shadow shadow-sm`}>
            <div className='mx-5 flex items-center'>
                <h1 className='font-koh_santepheap font-bold text-primarygray xl:text-4xl lg:text-3xl md:text-2xl sm:text-2xl'>
                    CVForge<span className='text-gptgreen'>.ai</span>
                </h1>
                <nav className='hidden md:block mx-auto xl:text-lg lg:text-lg md:text-md sm:text-sm'>
                    <ul className='flex xl:gap-6'>
                        <li>
                            <Link href='/' className="hover:text-gptgreen underline px-4 py-2 text-secondarygray" >Home</Link>
                        </li>
                        <li>
                            <Link href='/editor' className="hover:text-gptgreen hover:underline px-4 py-2 text-secondarygray" >Editor</Link>
                        </li>
                        <li>
                            <Link href='/cv_gallery' className="hover:text-gptgreen hover:underline px-4 py-2 text-secondarygray" >CV Gallery</Link>
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