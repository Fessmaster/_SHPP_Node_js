import { Response, NextFunction } from "express"
import { MyRequest } from "../models/types"

export function isUser (req: MyRequest, res: Response, next: NextFunction){
  if (!req.session.user){
    return res.status(401).json({error: 'forbidden'})
  }
  next()
}