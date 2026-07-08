import prisma from "../../config/database";
import { CreateMemberDto, UpdateMemberDto, MemberResponse } from "./member.types";

export const memberService = {
  async getAll(): Promise<MemberResponse[]> {
    const members = await prisma.member.findMany({
      where: { deleted_at: null },
      orderBy: { name: "asc" },
    });
    return members;
  },

  async getById(id: number): Promise<MemberResponse | null> {
    const member = await prisma.member.findFirst({
      where: { id, deleted_at: null },
    });
    return member;
  },

  async create(data: CreateMemberDto): Promise<MemberResponse> {
    const member = await prisma.member.create({ data });
    return member;
  },

  async update(id: number, data: UpdateMemberDto): Promise<MemberResponse> {
    const member = await prisma.member.update({
      where: { id },
      data,
    });
    return member;
  },

  async softDelete(id: number): Promise<void> {
    await prisma.member.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  },
};
