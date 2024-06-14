import { ProfessionalInfo } from "./ProfessionalInfoType";

export type Achievement = {
    achievement_id : string;
    professional_info_id?: string | null;
    name?: string | null;
    description?: string | null;
    //professional_info?: ProfessionalInfo | null;
};