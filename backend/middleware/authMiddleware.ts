import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "אין הרשאה, חסר טוקן" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "טוקן לא נמצא" });
  }

  try {
    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "חסר מפתח JWT_SECRET בסביבת העבודה" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    next();
  } catch (error) {
    return res.status(401).json({ message: "טוקן לא תקין" });
  }
};

export default authMiddleware;
