import { ProfessionalInfo } from "./professional";

export type Technology = {
  technology_id: string;
  professional_info_id?: string | null;
  professional_info?: ProfessionalInfo | null;
 };
 