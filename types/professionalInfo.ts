interface GeneralInfo {
  first_name: string
  last_name: string
  email: string
  phone: string
  github_link: string
  linkedin_link: string
}

interface Education {
  school: string
  education_degree: string
  gpa: number
  start_date: string
  end_date: string
  //   relevant_coursework: string;
}

interface Project {
  name: string
  description: string
  start_date: string
  end_date: string
}

interface Work {
  work_position: string | null
  description: string | null
  start_date: string | null
  end_date: string | null
}

export interface ProfessionalInfo {
  generalInfo?: GeneralInfo
  education?: Education[]
  project?: Project[]
  work?: Work[]
}
