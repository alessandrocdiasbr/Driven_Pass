import { prisma } from '../config/database';
import { CredentialData, Credential } from '../types/credentialTypes';

export async function findCredentialByTitle(userId: number, title: string): Promise<Credential | null> {
  return prisma.credential.findFirst({
    where: {
      userId,
      title
    }
  });
}

export async function createCredential(userId: number, credentialData: CredentialData): Promise<void> {
  await prisma.credential.create({
    data: {
      ...credentialData,
      userId
    }
  });
}

export async function findAllUserCredentials(userId: number): Promise<Credential[]> {
  return prisma.credential.findMany({
    where: { userId }
  });
}

export async function findCredentialById(id: number): Promise<Credential | null> {
  return prisma.credential.findUnique({
    where: { id }
  });
}

export async function updateCredential(
  id: number, 
  credentialData: CredentialData
): Promise<void> {
  await prisma.credential.update({
    where: { id },
    data: credentialData
  });
}

export async function deleteCredential(id: number): Promise<void> {
  await prisma.credential.delete({
    where: { id }
  });
}