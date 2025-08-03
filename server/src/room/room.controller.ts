import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RoomService } from "./room.service";
import { ApiResponse } from "../types";

export class RoomController {
  private roomService: RoomService;

  constructor() {
    this.roomService = new RoomService();
  }

  createRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          error: errors.array()[0].msg,
        } as ApiResponse);
        return;
      }

      const { name, description, type, maxParticipants } = req.body;
      const creator = req.user?.id;

      const room = await this.roomService.createRoom({
        name,
        description,
        type,
        creator,
        maxParticipants,
        participants: [creator!],
      });

      res.status(201).json({
        success: true,
        message: "Room created successfully",
        data: room,
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create room",
        error: (error as Error).message,
      } as ApiResponse);
    }
  };

  getAllRooms = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const rooms = await this.roomService.getAllRooms(page, limit);

      res.json({
        success: true,
        message: "Rooms retrieved successfully",
        data: rooms,
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get rooms",
        error: (error as Error).message,
      } as ApiResponse);
    }
  };

  getRoomById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const room = await this.roomService.getRoomById(id);

      if (!room) {
        res.status(404).json({
          success: false,
          message: "Room not found",
        } as ApiResponse);
        return;
      }

      res.json({
        success: true,
        message: "Room retrieved successfully",
        data: room,
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get room",
        error: (error as Error).message,
      } as ApiResponse);
    }
  };

  joinRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const room = await this.roomService.joinRoom(id, userId!);

      res.json({
        success: true,
        message: "Joined room successfully",
        data: room,
      } as ApiResponse);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to join room",
        error: (error as Error).message,
      } as ApiResponse);
    }
  };

  leaveRoom = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const room = await this.roomService.leaveRoom(id, userId!);

      res.json({
        success: true,
        message: "Left room successfully",
        data: room,
      } as ApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to leave room",
        error: (error as Error).message,
      } as ApiResponse);
    }
  };
}
