export interface CreateMemberDto {
  name: string;
  role: string;
  image_url: string;
  social_url: string;
}

export interface UpdateMemberDto {
  name?: string;
  role?: string;
  image_url?: string;
  social_url?: string;
}

export interface MemberResponse {
  id: number;
  name: string;
  role: string;
  image_url: string;
  social_url: string;
}
