import { GeneralInfo } from "./GeneralInfoType";

interface Education {
  school: string;
  education_degree: string;
  gpa: number;
  start_date: string;
  end_date: string;
}

interface Project {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

interface Work {
  work_position: string | null;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
}

export interface ProfessionalInfo {
  generalInfo?: GeneralInfo;
  education?: Education[];
  project?: Project[];
  work?: Work[];
}
