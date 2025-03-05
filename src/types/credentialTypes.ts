export interface CredentialData {
    title: string;
    url: string;
    username: string;
    password: string;
  }
  
  export interface Credential extends CredentialData {
    id: number;
    userId: number;
    createdAt: Date;
  }