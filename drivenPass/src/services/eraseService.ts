import { prisma } from '../config/database';
import { notFoundError } from '../utils/errorUtils';
import * as authRepository from '../repositories/authRepository';

export async function eraseUserData(userId: number): Promise<void> {
  const user = await authRepository.getUserById(userId);
  
  if (!user) {
    throw notFoundError('User');
  }
  
  // Using prisma transaction to ensure all data is deleted
  await prisma.$transaction([
    // Credentials are deleted automatically due to the onDelete: Cascade relation
    prisma.user.delete({
      where: { id: userId }
    })
  ]);
}