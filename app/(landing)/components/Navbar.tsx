
import Link from 'next/link';
import React from 'react';
import SignInOutButton from './SignInOutButton';

const Navbar: React.FC = () => {
    return (
        <div className='text-normaltext py-5 px-10 bg-white shadow-md'>
            <div className='max-w-screen-xl mx-auto flex justify-between items-center'>
                <h1 className='font-koh_santepheap text-4xl font-bold text-primarygray'>
                    <Link href='/'>
                      CVForge<span className='text-gptgreen'>.ai</span>
                    </Link>
                </h1>
                <nav className='hidden md:block'>
                    <ul className='flex gap-6'>
                        <li>
                            <Link href='/' className="text-lg hover:text-gptgreen hover:underline px-4 py-2 text-primarygray" >Home</Link>
                        </li>
                        <li>
                            <Link href='/editor' className="text-lg hover:text-gptgreen hover:underline px-4 py-2 text-primarygray" >Editor</Link>
                        </li>
                        <li>
                            <Link href='/roadmap' className="text-lg hover:text-gptgreen hover:underline px-4 py-2 text-primarygray" >Roadmap</Link>
                        </li>
                    </ul>
                </nav>
                <SignInOutButton/>
                <button className="md:hidden bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold py-2 px-4 rounded">
                    Menu
                </button>
            </div>
        </div>
    );
}

export default Navbar;