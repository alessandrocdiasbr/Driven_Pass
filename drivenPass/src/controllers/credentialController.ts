import { Request, Response } from 'express';
import * as credentialService from '../services/credentialService';
import { CredentialData } from '../types/credentialTypes';

export async function createCredential(req: Request, res: Response) {
  const userId = res.locals.userId;
  const credentialData: CredentialData = req.body;
  
  await credentialService.createCredential(userId, credentialData);
  res.sendStatus(201);
}

export async function getAllCredentials(req: Request, res: Response) {
  const userId = res.locals.userId;
  
  const credentials = await credentialService.getAllUserCredentials(userId);
  res.status(200).json(credentials);
}

export async function getCredentialById(req: Request, res: Response) {
  const userId = res.locals.userId;
  const credentialId = parseInt(req.params.id);
  
  const credential = await credentialService.getCredentialById(userId, credentialId);
  res.status(200).json(credential);
}

export async function updateCredential(req: Request, res: Response) {
  const userId = res.locals.userId;
  const credentialId = parseInt(req.params.id);
  const credentialData: CredentialData = req.body;
  
  await credentialService.updateCredential(userId, credentialId, credentialData);
  res.sendStatus(204);
}

export async function deleteCredential(req: Request, res: Response) {
  const userId = res.locals.userId;
  const credentialId = parseInt(req.params.id);
  
  await credentialService.deleteCredential(userId, credentialId);
  res.sendStatus(204);
}