import mongoose, { Schema } from "mongoose";
import { IRoom } from "../types";

const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    type: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    creator: {
      type: String,
      required: true,
      ref: "User",
    },
    participants: [
      {
        type: String,
        ref: "User",
      },
    ],
    maxParticipants: {
      type: Number,
      default: 10,
      min: 2,
      max: 50,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Room = mongoose.model<IRoom>("Room", roomSchema);
