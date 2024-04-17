import { ProfessionalInfo } from "./professional";
import { RelevantCoursework } from "./relevant";

export type Education = {
  education_id: string;
  school?: string | null;
  education_degree?: string | null;
  gpa?: number | null;
  start_date?: Date | null;
  end_date?: Date | null;
  professional_info_id?: string | null;
  professional_info?: ProfessionalInfo | null;
  relevant_coursework: RelevantCoursework[];
 };
 