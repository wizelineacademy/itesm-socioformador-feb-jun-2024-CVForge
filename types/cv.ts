import { AiResponse } from "./aiResponse";
import { Recommendation } from "./recommendation";
import { CvInsight } from "./cvInsight";
import { DesiredPosition } from "./desiredPosition";
import { User } from "./user";

export type CV = {
    cv_id: string;
    user_id?: string | null;
    cv_insight_id?: string | null;
    desired_psotion_id?: string | null;
    ai_response?: AiResponse | null; // falta agregar el tipo de dato ai_response
    cv_insight?: CvInsight | null; // falta agregar el tipo de dato CVInsight
    desired_position?: DesiredPosition | null; // falta agregar el tipo de dato DesiredPosition
    users?: User | null;
}