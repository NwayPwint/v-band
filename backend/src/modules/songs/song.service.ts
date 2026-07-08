import prisma from "../../config/database";
import { CreateSongDto, UpdateSongDto, SongResponse } from "./song.types";

export const songService = {
  async getAll(): Promise<SongResponse[]> {
    const songs = await prisma.song.findMany({
      where: { deleted_at: null },
      orderBy: { release_date: "desc" },
    });
    return songs;
  },

  async getById(id: number): Promise<SongResponse | null> {
    const song = await prisma.song.findFirst({
      where: { id, deleted_at: null },
    });
    return song;
  },

  async create(data: CreateSongDto): Promise<SongResponse> {
    const song = await prisma.song.create({
      data: {
        ...data,
        release_date: new Date(data.release_date),
      },
    });
    return song;
  },

  async update(id: number, data: UpdateSongDto): Promise<SongResponse> {
    const updateData: any = { ...data };
    if (data.release_date) {
      updateData.release_date = new Date(data.release_date);
    }
    const song = await prisma.song.update({
      where: { id },
      data: updateData,
    });
    return song;
  },

  async softDelete(id: number): Promise<void> {
    await prisma.song.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  },
};
