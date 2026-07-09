import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

export interface Member {
  id: number;
  name: string;
  role: string;
  image_url: string;
  social_url: string;
}

export interface Song {
  id: number;
  title: string;
  release_date: string;
  url: string;
  cover_image: string;
  type: string;
  is_latest: boolean;
  spotify_url: string | null;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  year: number | null;
}

export interface Event {
  id: number;
  title: string;
  event_date: string;
  venue: string;
  event_type: string;
  notes: string | null;
  link: string | null;
  image: string | null;
  ticket_url: string | null;
}

export const memberApi = {
  getAll: () => api.get<Member[]>("/members"),
  getById: (id: number) => api.get<Member>(`/members/${id}`),
  create: (data: Omit<Member, "id">) => api.post<Member>("/members", data),
  update: (id: number, data: Partial<Member>) => api.put<Member>(`/members/${id}`, data),
  delete: (id: number) => api.delete(`/members/${id}`),
};

export const songApi = {
  getAll: () => api.get<Song[]>("/songs"),
  getById: (id: number) => api.get<Song>(`/songs/${id}`),
  create: (data: Omit<Song, "id">) => api.post<Song>("/songs", data),
  update: (id: number, data: Partial<Song>) => api.put<Song>(`/songs/${id}`, data),
  delete: (id: number) => api.delete(`/songs/${id}`),
};

export const achievementApi = {
  getAll: () => api.get<Achievement[]>("/achievements"),
  getById: (id: number) => api.get<Achievement>(`/achievements/${id}`),
  create: (data: Omit<Achievement, "id">) => api.post<Achievement>("/achievements", data),
  update: (id: number, data: Partial<Achievement>) => api.put<Achievement>(`/achievements/${id}`, data),
  delete: (id: number) => api.delete(`/achievements/${id}`),
};

export const adminApi = {
  login: (password: string) => api.post<{ success: boolean }>("/admin/login", { password }),
};

export const eventApi = {
  getAll: () => api.get<Event[]>("/events"),
  getById: (id: number) => api.get<Event>(`/events/${id}`),
  create: (data: Omit<Event, "id">) => api.post<Event>("/events", data),
  update: (id: number, data: Partial<Event>) => api.put<Event>(`/events/${id}`, data),
  delete: (id: number) => api.delete(`/events/${id}`),
};
