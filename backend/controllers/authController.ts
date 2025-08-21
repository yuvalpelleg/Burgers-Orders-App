import { Request, Response } from "express";
import { hashPassword } from "../utils/hashPassword";
import { createToken } from "../utils/createToken";
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
    // Validate request body against schema
    const validatedData = registerSchema.parse(req.body);

    const { name, email, password, role, phone, address } = validatedData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash the password using your utility function
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
    });

    // Generate JWT token using your utility function (passing email)
    const token = createToken(email);

    // Send response (password is excluded due to toJSON transform in model)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
      token,
    });
  } catch (error: any) {
    // Handle Zod validation errors
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((err: any) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Handle other errors
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
