import { ProfessionalInfo } from "./professional";

export type ProgrammingLanguage = {
  programming_language_id: string;
  programming_language_name?: string | null;
  proficiency?: string | null;
  professional_info_id?: string | null;
  professional_info?: ProfessionalInfo | null;
 };

