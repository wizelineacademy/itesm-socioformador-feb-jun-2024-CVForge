import Link from 'next/link'
import React from 'react'

function Navbar() {
    return (
        <div className='text-normaltext py-5 px-10 gap-[40%] bg-white shadow-md flex'>
            <h1 className='font-koh_santepheap px-10 text-4xl font-bold'>CVForge<span className='text-gptgreen'>.ai</span></h1>
            <div className=''>
                <nav>
                    <ul className='flex gap-[30%]'>
                        <li className='py-2' href=''>
                            Home
                        </li>
                        <li className='py-2'>
                            Editor
                        </li>
                        <li className='py-2'>
                            Roadmap
                        </li>
                        <li className=''>
                            <button class="object-right bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold w-40 py-2 px-4 rounded">
                                Login/Sign up
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar