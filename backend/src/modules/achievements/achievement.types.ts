export interface CreateAchievementDto {
  title: string;
  description: string;
  icon?: string;
  year?: number;
}

export interface UpdateAchievementDto {
  title?: string;
  description?: string;
  icon?: string;
  year?: number;
}

export interface AchievementResponse {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  year: number | null;
}
