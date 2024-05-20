"use client";
import React from "react";
import { useState } from "react";
import Education from "./(sections)/Education";
import GeneralInfo from "./(sections)/GeneralInfo";
import Projects from "./(sections)/Projects";
import Skills from "./(sections)/Skills";
import WorkExperience from "./(sections)/WorkExperience";
const ProfessionalInfo: React.FC = () => {
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
    <div>
      <ul className="steps">
        <li className="step"><button onClick={() => handleSectionChange("general")}>General Info</button></li>
        <li className="step"><button onClick={() => handleSectionChange("work")}>Work Experience</button></li>
        <li className="step "><button onClick={() => handleSectionChange("education")}>Education</button></li>
        <li className="step"><button onClick={() => handleSectionChange("projects")}>Projects</button></li>
        <li className="step"><button onClick={() => handleSectionChange("skills")}>Skills</button></li>
      </ul>
      {sectionComponents[currentSection]}
    </div>
  );
};

export default ProfessionalInfo;
