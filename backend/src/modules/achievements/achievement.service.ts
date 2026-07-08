import prisma from "../../config/database";
import { CreateAchievementDto, UpdateAchievementDto, AchievementResponse } from "./achievement.types";

export const achievementService = {
  async getAll(): Promise<AchievementResponse[]> {
    return prisma.achievement.findMany({
      where: { deleted_at: null },
      orderBy: { year: "desc" },
    });
  },

  async getById(id: number): Promise<AchievementResponse | null> {
    return prisma.achievement.findFirst({
      where: { id, deleted_at: null },
    });
  },

  async create(data: CreateAchievementDto): Promise<AchievementResponse> {
    return prisma.achievement.create({ data });
  },

  async update(id: number, data: UpdateAchievementDto): Promise<AchievementResponse> {
    return prisma.achievement.update({
      where: { id },
      data,
    });
  },

  async softDelete(id: number): Promise<void> {
    await prisma.achievement.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  },
};
