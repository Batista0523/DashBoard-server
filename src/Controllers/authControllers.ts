import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { createUser, getUserByEmail } from "../Queries/dashboards_users";
const Auth = express.Router();
import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  id: number;
  role: string;
}
//Helper function to generate token
const generateToken = (id: number, role: string): string => {
  const payload: TokenPayload = { id, role };

  const secret: Secret = process.env.JWT_SECRET || "default_secret";

  const expiresIn = (process.env.JWT_EXPIRES_IN as any) || "7d";

  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(payload, secret, options);
};


Auth.post("/register", async (req: Request, res: Response) => {
  try {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please fill all required fields",
      });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "Email already registered",
      });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = await createUser({
      full_name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

 
    const token = generateToken(newUser!.id!, newUser!.role!);

    return res.status(201).json({
      success: true,
      payload: {
        user: newUser,
        token,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});


Auth.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password required",
      });
    }

  
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

  
    const token = generateToken(user.id!, user.role!);

    return res.status(200).json({
      success: true,
      payload: {
        user,
        token,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default Auth;
