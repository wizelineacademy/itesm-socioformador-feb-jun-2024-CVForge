import Link from 'next/link'
import React from 'react'

function Navbar() {
    return (
        <div className='text-black px-24 py-5 bg-white shadow-md flex'>
            <h1 className='font-koh_santepheap text-4xl font-bold'>CVForge<span className='text-green-400'>.ai</span></h1>
            <div className='text-right px-20 menu'>
                <nav>
                    <ul className='flex gap-[30%] py-3'>
                        <li href=''>
                            Home
                        </li>
                        <li>
                            Editor
                        </li>
                        <li>
                            Roadmap
                        </li>
                        <li>
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                button
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar