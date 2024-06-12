import { Education } from './education'

export type RelevantCoursework = {
  relevant_coursework_id: string
  education_id?: string | null
  course?: string | null
  education?: Education | null
}
