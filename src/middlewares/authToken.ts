import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from 'jsonwebtoken';

export default function authToken (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const secret = process.env.SECRET;
    
    if (!secret) {
      throw new Error('Secret not found');
    }

    jwt.verify(token, secret, (err: VerifyErrors | null) => {
      if (err) {
        console.error('Erro ao verificar o token:', err);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }

      next(); 
    });
  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
