import { CV } from "./cv";
import { Recommendation } from "./recommendation";

export type CvInsight = {
    cv_insight_id: string;
    score?: number | null;
    cv?: CV | null;
    recommendations: Recommendation[];
}