import * as credentialRepository from '../repositories/credentialRepository';
import { CredentialData, Credential } from '../types/credentialTypes';
import { conflictError, notFoundError, unauthorizedError } from '../utils/errorUtils';
import { encryptCredentialPassword, decryptCredentialPassword } from '../utils/cryptUtils';

export async function createCredential(
  userId: number, 
  credentialData: CredentialData
): Promise<void> {
  const existingCredential = await credentialRepository.findCredentialByTitle(
    userId, 
    credentialData.title
  );
  
  if (existingCredential) {
    throw conflictError('Credential title already exists for this user');
  }
  
  const encryptedPassword = encryptCredentialPassword(credentialData.password);
  
  await credentialRepository.createCredential(userId, {
    ...credentialData,
    password: encryptedPassword
  });
}

export async function getAllUserCredentials(userId: number): Promise<Credential[]> {
  const credentials = await credentialRepository.findAllUserCredentials(userId);
  
  return credentials.map(credential => ({
    ...credential,
    password: decryptCredentialPassword(credential.password)
  }));
}

export async function getCredentialById(
  userId: number, 
  credentialId: number
): Promise<Credential> {
  const credential = await credentialRepository.findCredentialById(credentialId);
  
  if (!credential) {
    throw notFoundError('Credential');
  }
  
  if (credential.userId !== userId) {
    throw unauthorizedError('This credential does not belong to you');
  }
  
  return {
    ...credential,
    password: decryptCredentialPassword(credential.password)
  };
}

export async function updateCredential(
  userId: number,
  credentialId: number,
  credentialData: CredentialData
): Promise<void> {
  const credential = await credentialRepository.findCredentialById(credentialId);
  
  if (!credential) {
    throw notFoundError('Credential');
  }
  
  if (credential.userId !== userId) {
    throw unauthorizedError('This credential does not belong to you');
  }
  
  
  if (credential.title !== credentialData.title) {
    const existingCredential = await credentialRepository.findCredentialByTitle(
      userId, 
      credentialData.title
    );
    
    if (existingCredential) {
      throw conflictError('Credential title already exists for this user');
    }
  }
  
  const encryptedPassword = encryptCredentialPassword(credentialData.password);
  
  await credentialRepository.updateCredential(credentialId, {
    ...credentialData,
    password: encryptedPassword
  });
}

export async function deleteCredential(
  userId: number, 
  credentialId: number
): Promise<void> {
  const credential = await credentialRepository.findCredentialById(credentialId);
  
  if (!credential) {
    throw notFoundError('Credential');
  }
  
  if (credential.userId !== userId) {
    throw unauthorizedError('This credential does not belong to you');
  }
  
  await credentialRepository.deleteCredential(credentialId);
}