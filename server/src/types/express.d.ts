// Create a file: types/express.d.ts
import { IUser } from "./index"; // Your user interface

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// Alternative: If you want to keep the simplified user object
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        email: string;
      };
    }
  }
}
