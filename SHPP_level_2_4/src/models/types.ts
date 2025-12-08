import { Session } from "express-session";
import { Request } from "express";

interface UserSession {
  user?: { login: string };
}

export interface MyRequest extends Request {
  session: Session & Partial<UserSession>;
}