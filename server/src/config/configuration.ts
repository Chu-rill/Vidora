export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
    expiresIn: process.env.JWT_EXPIRE || '24h',
  },
  bcrypt: {
    rounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 12,
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  session: {
    secret: process.env.SESSION_SECRET || 'your-session-secret',
  },
  nodeEnv: process.env.NODE_ENV || 'development',
});
