import { PrismaClient, User as PrismaUser } from "../../generated/prisma";
import { IUser } from "../types";

const prisma = new PrismaClient();

export class UserRepository {
  async create(userData: Partial<IUser>): Promise<PrismaUser> {
    return await prisma.user.create({ data: userData as any });
  }

  async findById(id: string): Promise<PrismaUser | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<PrismaUser | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string): Promise<PrismaUser | null> {
    return await prisma.user.findUnique({ where: { username } });
  }

  async updateById(
    id: string,
    updateData: Partial<IUser>
  ): Promise<PrismaUser | null> {
    return await prisma.user.update({
      where: { id },
      data: updateData as any,
    });
  }

  async deleteById(id: string): Promise<PrismaUser | null> {
    return await prisma.user.delete({ where: { id } });
  }

  async findAll(page: number = 1, limit: number = 10): Promise<PrismaUser[]> {
    const skip = (page - 1) * limit;
    return await prisma.user.findMany({
      skip,
      take: limit,
    });
  }

  async updateOnlineStatus(
    id: string,
    isOnline: boolean
  ): Promise<PrismaUser | null> {
    return await prisma.user.update({
      where: { id },
      data: { isOnline, lastSeen: new Date() },
    });
  }
}
