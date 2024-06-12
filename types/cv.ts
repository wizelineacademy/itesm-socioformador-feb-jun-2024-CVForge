import { AIResponse } from './aiResponse'
import { CvInsight } from './cvInsight'
import { DesiredPosition } from './desiredPosition'
import { User } from './user'

export type CV = {
  cv_id: string
  user_id?: string | null
  cv_insight_id?: string | null
  desired_position_id?: string | null
  /* ai_response?: AIResponse | null; 
    cv_insight?: CvInsight | null;
    desired_position?: DesiredPosition | null; 
    users?: User | null; */
}
