import { Request } from 'express';

export interface AuthRequest extends Request {
  user: { id: string }; // Add other properties if needed
}
