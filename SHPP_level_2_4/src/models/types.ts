import { Session } from "express-session";
import { Request } from "express";

export interface Task {
  id: number;
  text: string;
  checked: boolean;
  owner: string;
}

export interface Login {
  login: string;
  password: string;
}

interface UserSession {
  user?: { login: string };
}

export interface MyRequest extends Request {
  session: Session & Partial<UserSession>;
}