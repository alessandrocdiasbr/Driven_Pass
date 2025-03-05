import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cryptr from 'cryptr';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const CRYPTR_SECRET = process.env.CRYPTR_SECRET || 'anothersupersecretkey';
const cryptr = new Cryptr(CRYPTR_SECRET);

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
}

export function validateToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}

export function encryptCredentialPassword(password: string): string {
  return cryptr.encrypt(password);
}

export function decryptCredentialPassword(encryptedPassword: string): string {
  return cryptr.decrypt(encryptedPassword);
}