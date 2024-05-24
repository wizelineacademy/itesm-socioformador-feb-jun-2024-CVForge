import React from "react";
import SecondaryLogo from "@/public/assets/SecondaryLogo"
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primarygray p-8 px-16 flex flex-col text-whitefo">
      <div className="flex flex-row justify-between w-full px-28">
        {/* Logo and info */}
        <div className="flex flex-col w-40 mr-32 mb-auto">
          <SecondaryLogo />
          <p className="text-sm py-2 pl-1">Av. Eugenio Garza Sada 2501 Sur, Tecnológico, 64849 Monterrey, N.L.</p>
        </div>
        {/* Contact Us */}
        <div className="flex flex-col w-40">
          <h1 className="font-bold text-xl text-secondarygray">Contact Us</h1>
          <Link className=" mr-auto" href="https://www.linkedin.com/company/cvforge/about/">
            <p className="text-md py-1 hover:underline">LinkedIn</p>
          </Link>
        </div>
        {/* Services */}
        <div className="flex flex-col w-40">
          <h1 className="font-bold text-xl text-secondarygray">Services</h1>
          <Link className=" mr-auto" href="/cv_gallery">
            <p className="text-md py-1 hover:underline">CV Creation</p>
          </Link>
        </div>
        {/* Thanks */}
        <div className="flex flex-col w-40">
          <h1 className="font-bold text-xl text-secondarygray pb-3">Thanks To</h1>
          <img src="/assets/tec-logo.png" alt="Tecnológico de Monterrey"/>
          <img src="/assets/wizeline-logo.png" alt="Wizeline"/>
        </div>
      </div>
      <div className="bg-secondarygray w-full h-0.5 rounded bg-opacity-30"/>
      <Link className="mx-auto" href="/">
        <p className="text-md text-secondarygray pt-1 hover:underline">To Top</p>
      </Link>
    </footer>
  );
};

export default Footer;
