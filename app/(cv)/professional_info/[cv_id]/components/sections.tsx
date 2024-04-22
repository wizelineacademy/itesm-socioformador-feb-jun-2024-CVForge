import React from "react";
import { Link } from "react-router-dom";

const Sections: React.FC = () => {
    // Define an array of section names and their corresponding paths
    const sections = [
        { name: "< General Info", path: "#" },
        { name: "< Achievements", path: "#" },
        { name: "< Work Experience", path: "#" },
        { name: "< Certificates", path: "#" },
        { name: "< Skills", path: "#" }
        // Add more section names and paths as needed
    ];

    return (
        <div className="bg-white shadow-lg p-8 rounded-md w-240 h-272 mr-10 mt-10 fixed">
            {/* Text section */}
            <div className="text-xl font-bold mb-4 text-primarygray">Sections</div>
            
            {/* List of text buttons */}
            <ul>
                {sections.map(({ name, path }, index) => (
                    <li key={index}>
                        {/* Link for each section */}
                        <Link to={path} className="text-black text-base py-1 px-2">
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sections;
