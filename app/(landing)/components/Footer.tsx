import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="flex-shrink-0 mr-8">
          <Image src="/assets/logo.png" alt="Logo" width={100} height={100} />
        </div>
        <div className="flex-grow flex flex-col md:flex-row justify-center md:justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0 md:mr-20">
            <h3 className="text-lg text-gptgreen font-bold">Company</h3>
            <a href="#" className="block text-gray-400 hover:text-white">
              About us
            </a>
          </div>
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h3 className="text-lg text-gptgreen font-bold mb-4">
              Coming soon on
            </h3>
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <a href="#" className="block mb-2 md:mb-0 md:mr-4">
                <Image
                  src="/assets/linkedin.svg"
                  alt="LinkedIn"
                  width={30}
                  height={30}
                />
              </a>
              <a
                href="mailto:contact@cvforge.ai"
                className="block mb-2 md:mb-0 md:mr-4"
              >
                <Image src="/assets/x.png" alt="X" width={30} height={30} />
              </a>
              <a href="#" className="block mb-2 md:mb-0">
                <Image src="/assets/github.png" alt="GitHub" width={30} height={30} />
              </a>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg text-gptgreen font-bold">Thanks To</h3>
            <div className="flex items-center justify-center md:justify-start">
              <a
                href="https://www.tec.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="block mr-4"
              >
                <Image
                  src="/assets/tec.png"
                  alt="Tecnológico de Monterrey"
                  width={110}
                  height={110}
                />
              </a>
              <a
                href="https://www.wizeline.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src="/assets/wizeline.png"
                  alt="Wizeline"
                  width={90}
                  height={90}
                />
              </a>
            </div>
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