"use client";
import React from "react";
import { useState, useEffect} from "react";
import Education from "./(sections)/Education";
import GeneralInfo from "./(sections)/GeneralInfo";
import Projects from "./(sections)/Projects";
import Skills from "./(sections)/Skills";
import WorkExperience from "./(sections)/WorkExperience";
import { setCurrentTab } from "@/contexts/cv/sidebar/currentTab";
import { useDispatch } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import {getProfessionalByEmail} from "@/services/sessionService";
import {getEducation, getGeneralInfo, getProjects, getSkills, getWorks} from "@/services/professional_information/generalService";
import { useSession } from "next-auth/react";
import GalleryLoading from "@/app/components/loading";
const ProfessionalInfo: React.FC = () => {
  interface Education {
    education_id: string;
    school: string;
    education_degree: string;
    gpa: number;
    start_date: Date;
    end_date: Date;
    relevant_coursework: string;
  }
  interface GeneralInfo {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    github_link: string;
    linkedin_link: string;
  }
  interface Project {
    project_id: string;
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
  }
  interface Skill {
    skill_id : string;
    title : string;
    proficiency : string;
  }
  interface Work {
    work_experience_id : string;
    work_position : string;
    description : string;
    start_date : Date;
    end_date : Date;
  }
  const dispatch = useDispatch()
  dispatch(setCurrentTab("editor"))
  const { data: session } = useSession();
  const [currentSection, setCurrentSection] = useState("general");
  const [professionalID, setProfessionalID] = useState<string | null>(null);
  const [educations, setEducations] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [existingGeneralInfo, setExistingGeneralInfo] = useState<GeneralInfo>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    github_link: "",
    linkedin_link: "",
  });
  const sectionComponents = {
    general: (<GeneralInfo 
    generalInfo = {existingGeneralInfo}
    setGeneralInfo = {setExistingGeneralInfo}
    professionalID = {professionalID}
    />
    ),
    education: 
      (<Education
        educations={educations}
        setEducations={setEducations}
        professionalID={professionalID}
      />),
    projects: (<Projects 
      projectsList={projects}
      setProjects={setProjects}
      professionalID={professionalID}
    />),
    work: <WorkExperience 
      works={works}
      setWorks={setWorks}
      professionalID={professionalID}/>,
    skills: <Skills 
      skillList={skills}
      setSkills={setSkills}
      professionalID={professionalID}
    />,
  };
  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  useEffect(() => {
    const fetchProfessionalID = async () => {
      if (session?.user?.email) {
        const staticID = await getProfessionalByEmail(session.user.email);
        setProfessionalID(staticID);
      }
    };
    fetchProfessionalID();
  }, [session]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const worksGetted = await getWorks(professionalID);
        setWorks(worksGetted);
      }
      catch (error) {
        console.log("There was an error trying to fetch the works", error)
      }
    }
    fetchWorks();
  }, [professionalID]); 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsGetted = await getProjects(professionalID);
        setProjects(projectsGetted);
        console.log(projectsGetted)
      }
      catch (error) {
        console.log("There was an error trying to fetch the projects", error)
      }
    }
    fetchProjects();
  }, [professionalID]);

  useEffect(() => {
    const fetchEducations = async () => {
      setIsLoading(true);
      if (professionalID) {
        const fetchedEducations = await getEducation(professionalID);
        setEducations(fetchedEducations);
      }
      setIsLoading(false);
    };

    fetchEducations();
  }, [professionalID]);

  useEffect(() => {
    setIsLoading(true);
    const fetchExistingGeneralInfo = async () => {
      try {
        const existingInfo = await getGeneralInfo(professionalID);
        if (existingInfo) {
          setExistingGeneralInfo(existingInfo);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching existing general info:", error);
      }
    };
    if (professionalID) fetchExistingGeneralInfo();
  }, [professionalID]);

  useEffect(() => {
    const fetchProfessionalID = async () => {
      if (session?.user?.email) {
        const staticID = await getProfessionalByEmail(session.user.email);
        setProfessionalID(staticID);
      }
    };
    
    fetchProfessionalID();
  }, [session]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsGetted = await getSkills(professionalID);
        setSkills(skillsGetted);
      }
      catch (error) {
        console.log("There was an error trying to fetch the skills", error)
      }
    }
    fetchSkills();
  }, [professionalID]);

  return (
    <>
    {isLoading? (
      <div className="absolute w-screen h-screen top-0 left-0 bg-primarygray bg-opacity-50 flex justify-center items-center z-10">
        <GalleryLoading />
      </div>
    ) : (
      <div className="flex flex-row mx-auto justify-center h-screen">
      {/* Form */}
      <div className="h-full overflow-y-scroll hide-scrollbar">
        <div className="bg-white my-10 w-[846px] rounded-lg py-5 px-8 shadow-lg">
            {sectionComponents[currentSection]}
        </div>
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

    )}
    </>

  );
};

export default ProfessionalInfo;
