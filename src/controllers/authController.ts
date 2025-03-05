import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { SignUpData, SignInData } from '../types/authTypes';

export async function signUp(req: Request, res: Response) {
  const userData: SignUpData = req.body;
  await authService.createUser(userData);
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const loginData: SignInData = req.body;
  const token = await authService.login(loginData);
  res.status(200).json({ token });
}