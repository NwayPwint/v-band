export interface CreateSongDto {
  title: string;
  release_date: string;
  url: string;
  cover_image: string;
  type: string;
  is_latest?: boolean;
  spotify_url?: string;
}

export interface UpdateSongDto {
  title?: string;
  release_date?: string;
  url?: string;
  cover_image?: string;
  type?: string;
  is_latest?: boolean;
  spotify_url?: string;
}

export interface SongResponse {
  id: number;
  title: string;
  release_date: Date;
  url: string;
  cover_image: string;
  type: string;
  is_latest: boolean;
  spotify_url: string | null;
}
