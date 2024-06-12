import { User } from '@/types/user'
import { ProgrammingLanguage } from './programming'
import { Technology } from '@/types/technology'
import { Education } from '@/types/education'
import { Project } from './project'
import { WorkExperience } from './experience'

export type ProfessionalInfo = {
  professional_info_id: string
  user_id?: string | null
  education: Education[]
  users?: User | null
  programming_language: ProgrammingLanguage[]
  project: Project[]
  technology: Technology[]
  work_experience: WorkExperience[]
}
