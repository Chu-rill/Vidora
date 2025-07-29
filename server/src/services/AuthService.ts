import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";
import { config } from "../config/config";
import { IUser } from "../types";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const existingUsername = await this.userRepository.findByUsername(username);
    if (existingUsername) {
      throw new Error("Username already taken");
    }

    // Create user
    const user = await this.userRepository.create({
      username,
      email,
      password,
    });

    // Generate token
    const token = this.generateToken(user._id);

    return { user, token };
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    // Find user
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Check password
    const isPasswordValid = await (user as any).comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Update online status
    await this.userRepository.updateOnlineStatus(user._id, true);

    // Generate token
    const token = this.generateToken(user._id);

    return { user, token };
  }

  async logout(userId: string): Promise<void> {
    await this.userRepository.updateOnlineStatus(userId, false);
  }

  private generateToken(userId: string): string {
    // Ensure JWT_SECRET exists and is a string
    const secret = config.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    // Handle expiresIn - ensure it's a valid type
    const expiresIn = config.JWT_EXPIRE;
    let tokenOptions: jwt.SignOptions = {};

    return jwt.sign({ userId }, secret, tokenOptions);
  }

  verifyToken(token: string): jwt.JwtPayload | string {
    const secret = config.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    return jwt.verify(token, secret);
  }
}
