import { prisma } from '../config/database';
import { notFoundError } from '../utils/errorUtils';
import * as authRepository from '../repositories/authRepository';

export async function eraseUserData(userId: number): Promise<void> {
  const user = await authRepository.getUserById(userId);
  
  if (!user) {
    throw notFoundError('User');
  }
  

  await prisma.$transaction([
    prisma.user.delete({
      where: { id: userId }
    })
  ]);
}