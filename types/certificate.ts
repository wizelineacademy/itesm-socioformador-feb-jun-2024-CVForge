import { ProfessionalInfo } from './professional';

export type Certificate = {
    certificate_id : string;
    professional_info_id?: string | null;
    title : string | null;
    organization : string | null;
    start_date : Date | null;
    end_date : Date | null;
    url : string | null;
    ProfessionalInfo?: ProfessionalInfo | null;
};