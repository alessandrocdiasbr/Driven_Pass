import * as authRepository from '../repositories/authRepository';
import { SignUpData, SignInData } from '../types/authTypes';
import { hashPassword, comparePasswords, generateToken } from '../utils/cryptUtils';
import { conflictError, notFoundError, unauthorizedError } from '../utils/errorUtils';

export async function createUser(userData: SignUpData): Promise<void> {
  const existingUser = await authRepository.findUserByEmail(userData.email);
  
  if (existingUser) {
    throw conflictError('Email already registered');
  }
  
  const hashedPassword = await hashPassword(userData.password);
  
  await authRepository.createUser({
    ...userData,
    password: hashedPassword
  });
}

export async function login(loginData: SignInData): Promise<string> {
  const user = await authRepository.findUserByEmail(loginData.email);
  
  if (!user) {
    throw notFoundError('User');
  }
  
  const passwordValid = await comparePasswords(loginData.password, user.password);
  
  if (!passwordValid) {
    throw unauthorizedError('Invalid password');
  }
  
  return generateToken(user.id);
}