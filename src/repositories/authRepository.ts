import { prisma } from '../config/database';
import { SignUpData, User } from '../types/authTypes';

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email }
  });
}

export async function createUser(userData: SignUpData): Promise<void> {
  await prisma.user.create({
    data: userData
  });
}

export async function getUserById(userId: number): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id: userId }
  });
}