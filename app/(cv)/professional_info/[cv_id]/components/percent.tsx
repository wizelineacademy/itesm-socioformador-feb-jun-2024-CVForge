import React from "react";

const Percent: React.FC<{ percent: number }> = ({ percent }) => {
    // Define a function to determine the color based on the percent value
    const getPercentColor = (percent: number): string => {
        if (percent >= 75) {
            return "text-gptgreen";
        } else if (percent >= 50) {
            return "text-yellow-500"; 
        } else {
            return "text-red-500"; 
        }
    };

    return (
        <div className="bg-white shadow-lg p-8 rounded-lg w-251 h-35 mr-10 mt-10 fixed">
            <div className="text-center">Complete Percent</div>
            <div className={`text-center mt-2 ${getPercentColor(percent)}`}>
                {percent}%
            </div>
        </div>
    );
}

export default Percent;