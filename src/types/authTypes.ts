export interface SignUpData {
    name: string;
    email: string;
    password: string;
  }
  
  export interface SignInData {
    email: string;
    password: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
  }
  
  export type UserWithoutPassword = Omit<User, 'password'>;