export interface Education {
  education_id: string;
  school: string;
  education_degree: string;
  gpa: number;
  start_date: Date;
  end_date: Date;
  relevant_coursework: string;
}

interface EducationInput {
  school: string;
  educationDegree: string;
  gpa?: number;
  startDate?: Date;
  endDate?: Date;
  relevantCoursework?: string[];
}
