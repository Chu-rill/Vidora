// types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string; // Transformed from _id
        username: string;
        email: string;
      };
    }
  }
}

export {}; // Make this a module
