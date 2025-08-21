import { Request, Response } from "express";
import { Product } from "../models/Product";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const order = new Product(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
