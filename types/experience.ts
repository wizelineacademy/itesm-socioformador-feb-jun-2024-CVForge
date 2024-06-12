import { ProfessionalInfo } from './professional'

export type WorkExperience = {
  work_experience_id: string
  work_position?: string | null
  description?: string | null
  start_date?: Date | null
  end_date?: Date | null
  professional_info_id?: string | null
  professional_info?: ProfessionalInfo | null
}
