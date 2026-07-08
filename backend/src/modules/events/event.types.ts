export interface CreateEventDto {
  title: string;
  event_date: string;
  venue: string;
  event_type?: string;
  notes?: string;
  link?: string;
  image?: string;
  ticket_url?: string;
}

export interface UpdateEventDto {
  title?: string;
  event_date?: string;
  venue?: string;
  event_type?: string;
  notes?: string;
  link?: string;
  image?: string;
  ticket_url?: string;
}

export interface EventResponse {
  id: number;
  title: string;
  event_date: Date;
  venue: string;
  event_type: string;
  notes: string | null;
  link: string | null;
  image: string | null;
  ticket_url: string | null;
}
