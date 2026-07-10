export interface CreateInterviewDto {
  source: string;
  title: string;
  url: string;
  cover_image?: string;
  date?: string;
}

export interface UpdateInterviewDto {
  source?: string;
  title?: string;
  url?: string;
  cover_image?: string;
  date?: string;
}

export interface InterviewResponse {
  id: number;
  source: string;
  title: string;
  url: string;
  cover_image: string | null;
  date: Date | null;
}
