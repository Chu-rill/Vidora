import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./config";
import { User } from "../models/User";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export const setupPassport = () => {
  // Serialize user for session
  passport.serializeUser((user: any, done) => {
    done(null, user._id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const result = await authService.googleAuth(profile);
          return done(null, result.user);
        } catch (error) {
          return done(error as Error, undefined);
        }
      }
    )
  );
};
