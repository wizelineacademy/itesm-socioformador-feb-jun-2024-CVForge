import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <div>
                    <Image src="/logo.png" alt="Logo" width={100} height={100} />
                </div>
                <div className="flex justify-around w-full mb-4">
                    <div className="px-20">
                        <h3 className="text-lg font-bold">Company</h3>
                        <a href="#" className="block">About us</a>
                    </div>
                    <div className="px-20">
                        <h3 className="text-lg font-bold">Coming soon on</h3>
                        <a href="#" className="block">
                            <Image src="/linkedin.svg" alt="LinkedIn" width={30} height={30} />
                        </a>
                        <a href="mailto:contact@cvforge.ai" className="block">
                            <Image src="/x.png" alt="X" width={30} height={30} />
                        </a>
                        <a href="#" className="block">
                            <Image src="/github.png" alt="GitHub" width={30} height={30} />
                        </a>
                    </div>
                    <div className="px-20">
                        <h3 className="text-lg font-bold">Thanks To</h3>
                        <a href="https://www.tec.mx" target="_blank" rel="noopener noreferrer">
                            <Image src="/tec.png" alt="Tecnológico de Monterrey" width={110} height={110} />
                        </a>
                        <a href="https://www.wizeline.com" target="_blank" rel="noopener noreferrer">
                            <Image src="/wizeline.png" alt="Wizeline" width={90} height={90} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4">
                <p>© 2024 CVForge.ai All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
