import React from "react";

const Sections: React.FC = () => {
    // Define an array of section names
    const sectionNames = [
        "< General Info",
        "< Achievments",
        "< Work Experience",
        "< Certficates",
        "< Skills"
        // Add more section names as needed
    ];

    return (
        <div className="bg-white shadow-lg p-8 rounded-md w-240 h-272 mr-10 mt-10 fixed">
            {/* Text section */}
            <div className="text-xl font-bold mb-4 text-primarygray">Sections</div>
            
            {/* List of text buttons */}
            <ul>
                {sectionNames.map((name, index) => (
                    <li key={index}>
                        {/* Button for each section name */}
                        <button className="text-black text-base py-1 px-2 ">
                            {name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sections;