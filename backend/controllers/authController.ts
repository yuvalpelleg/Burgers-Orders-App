import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(30, "Name must be less than 30 characters")
    .trim(),

  email: z.email("Please provide a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be less than 30 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
  role: z.enum(["user", "admin"]).default("user"),
  
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]+$/, "Please provide a valid phone number")
    .optional(),

  address: z.object({
    street: z
      .string()
      .min(1, "Street is required")
      .max(50, "Street must be less than 50 characters")
      .trim(),
    houseNumber: z.number("House number must be a number"),
    floorNumber: z.number("Floor number must be a number").optional(),
    apartmentNumber: z.number("Apartment number must be a number").optional(),
  }),
});

export const register = async (req: Request, res: Response) => {
  try {
    
  }
};
