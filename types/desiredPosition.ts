import { CV } from "./cv";

export type DesiredPosition = {
    desired_position_id: string;
    title?: string | null;
    description?: string | null;
    company?: string | null;
    years_experience?: number | null;
    cv?: CV | null;
}