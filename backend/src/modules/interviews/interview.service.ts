import prisma from "../../config/database";
import { CreateInterviewDto, UpdateInterviewDto, InterviewResponse } from "./interview.types";

function getYTThumbnail(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
}

export const interviewService = {
  async getAll(): Promise<InterviewResponse[]> {
    const interviews = await prisma.interview.findMany({
      where: { deleted_at: null },
      orderBy: { date: "desc" },
    });
    return interviews;
  },

  async getById(id: number): Promise<InterviewResponse | null> {
    const interview = await prisma.interview.findFirst({
      where: { id, deleted_at: null },
    });
    return interview;
  },

  async create(data: CreateInterviewDto): Promise<InterviewResponse> {
    const interview = await prisma.interview.create({
      data: {
        source: data.source,
        title: data.title,
        url: data.url,
        cover_image: data.cover_image || getYTThumbnail(data.url),
        date: data.date ? new Date(data.date) : null,
      },
    });
    return interview;
  },

  async update(id: number, data: UpdateInterviewDto): Promise<InterviewResponse> {
    const updateData: any = { ...data };
    if (data.date) {
      updateData.date = new Date(data.date);
    }
    if (!updateData.cover_image && updateData.url) {
      updateData.cover_image = getYTThumbnail(updateData.url);
    }
    const interview = await prisma.interview.update({
      where: { id },
      data: updateData,
    });
    return interview;
  },

  async softDelete(id: number): Promise<void> {
    await prisma.interview.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  },
};
