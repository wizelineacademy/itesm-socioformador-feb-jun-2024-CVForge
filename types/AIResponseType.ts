export type AIResponse = {
  ai_response_id: string;
  plain_text?: string | null;
  cv_id?: string | null;
  tokens?: number | null;
  request_id?: Date | null;
};
