import React from "react";
import Link from "next/link";

const Sections: React.FC = () => {
    // Define an array of section names and their respective paths
    const sectionPaths = [
        { name: "General Info", path: "/professional_info/1/general_info" },
        { name: "Achievements", path: "/professional_info/1/achievments" },
        { name: "Work Experience", path: "/professional_info/1/work_experience" },
        { name: "Certificates", path: "/professional_info/1//certificate" },
        { name: "Skills", path: "/professional_info/1/skills" }
        // Add more section names and paths as needed
    ];

    return (
        <div className="bg-white shadow-lg p-8 rounded-md w-240 h-272 mt-10">
                {/* Text section */}
                <div className="text-xl font-bold mb-4">Sections</div>
                
                {/* List of text buttons */}
                <ul>
                    {sectionPaths.map(({ name, path }, index) => (
                        <li key={index}>
                            {/* Link for each section name */}
                            <Link href={path}>
                                <button className="text-black text-base py-1 px-2 cursor-pointer">
                                    {name}
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
    );
}

export default Sections;
