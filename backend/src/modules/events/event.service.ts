import prisma from "../../config/database";
import { CreateEventDto, UpdateEventDto, EventResponse } from "./event.types";

export const eventService = {
  async getAll(): Promise<EventResponse[]> {
    const events = await prisma.event.findMany({
      where: { deleted_at: null },
      orderBy: { event_date: "desc" },
    });
    return events;
  },

  async getById(id: number): Promise<EventResponse | null> {
    const event = await prisma.event.findFirst({
      where: { id, deleted_at: null },
    });
    return event;
  },

  async create(data: CreateEventDto): Promise<EventResponse> {
    const event = await prisma.event.create({
      data: {
        ...data,
        event_date: new Date(data.event_date),
      },
    });
    return event;
  },

  async update(id: number, data: UpdateEventDto): Promise<EventResponse> {
    const updateData: any = { ...data };
    if (data.event_date) {
      updateData.event_date = new Date(data.event_date);
    }
    const event = await prisma.event.update({
      where: { id },
      data: updateData,
    });
    return event;
  },

  async softDelete(id: number): Promise<void> {
    await prisma.event.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  },
};
