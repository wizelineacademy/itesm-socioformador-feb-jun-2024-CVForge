import { ProfessionalInfo } from './professional'

export type Skill = {
  skill_id: string
  professional_info_id?: string | null
  title?: string | null
  duration?: string | null
  proficiency?: string | null
  tag?: string | null
  //professional_info?: ProfessionalInfo | null;
}
