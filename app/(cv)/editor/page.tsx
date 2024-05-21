"use client";
import React from "react";
import { useState } from "react";
import Education from "./(sections)/Education";
import GeneralInfo from "./(sections)/GeneralInfo";
import Projects from "./(sections)/Projects";
import Skills from "./(sections)/Skills";
import WorkExperience from "./(sections)/WorkExperience";
import { setCurrentTab } from "@/contexts/cv/sidebar/currentTab";
import { useDispatch } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";

const ProfessionalInfo: React.FC = () => {
  const dispatch = useDispatch()
  dispatch(setCurrentTab("editor"))

  const [currentSection, setCurrentSection] = useState("general");

  const sectionComponents = {
    general: <GeneralInfo />,
    education: <Education />,
    projects: <Projects />,
    work: <WorkExperience />,
    skills: <Skills />,
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  return (
    <div className="flex flex-row mx-auto justify-center">
      {/* Form */}
      <div className="bg-white my-10 w-[846px] h-auto rounded-lg py-5 px-8 shadow-lg">
        {sectionComponents[currentSection]}
      </div>
      {/* Side Menu */}
      <div className="bg-white my-10 ml-10 py-5 px-6 w-auto h-auto rounded-lg mb-auto shadow-lg">
        <ul className="steps text-secondarygray space-y-2 > *">
          <li className="step hover:text-gptgreen hover:underline"><button className= "flex felx-row flex-nowrap items-center" onClick={() => handleSectionChange("general")}> <IoIosArrowForward/> General Info</button></li>
          <li className="step hover:text-gptgreen hover:underline"><button className= "flex felx-row flex-nowrap items-center" onClick={() => handleSectionChange("work")}> <IoIosArrowForward/> Work Experience</button></li>
          <li className="step hover:text-gptgreen hover:underline"><button className= "flex felx-row flex-nowrap items-center" onClick={() => handleSectionChange("education")}> <IoIosArrowForward/> Education</button></li>
          <li className="step hover:text-gptgreen hover:underline"><button className= "flex felx-row flex-nowrap items-center" onClick={() => handleSectionChange("projects")}> <IoIosArrowForward/> Projects</button></li>
          <li className="step hover:text-gptgreen hover:underline"><button className= "flex felx-row flex-nowrap items-center" onClick={() => handleSectionChange("skills")}> <IoIosArrowForward/> Skills</button></li>
        </ul>
      </div>
    </div>
  );
};

export default ProfessionalInfo;