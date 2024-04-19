import { CvInsight } from "./cvInsight";

export type Recommendation = {
    recommendation_id: string;
    cv_insight_id?: string | null;
    title?: string | null;
    main_content?: string | null;
    //cv_insight?: CvInsight | null;
}
