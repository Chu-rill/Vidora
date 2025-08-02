import { Router } from "express";
import { RoomController } from "../controllers/room.controller";
import { createRoomValidation } from "../validation/user.validation";
import { authenticate } from "../middleware/auth";
import { zodValidate } from "../middleware/zodValidate";

const router = Router();
const roomController = new RoomController();

router.post(
  "/",
  authenticate,
  zodValidate(createRoomValidation),
  roomController.createRoom
);
router.get("/", authenticate, roomController.getAllRooms);
router.get("/:id", authenticate, roomController.getRoomById);
router.post("/:id/join", authenticate, roomController.joinRoom);
router.post("/:id/leave", authenticate, roomController.leaveRoom);

export { router as roomRoutes };
