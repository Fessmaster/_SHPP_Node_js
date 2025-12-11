import { Router } from "express";
import { handleRouterAction } from "../utils/utilities";
import { MyRequest } from "../models/types";

const router = Router() 

const publicActions = ["login", "logout", "register"]

router.all("/", async (req:MyRequest, res) =>{
  const actionName = req.query.action as string 
  
  if (!publicActions.includes(actionName) && !req.session.user){    
    res.status(401).json({ error: "forbidden" });
    return;    
  }

  if (actionName in handleRouterAction){
    const executer = handleRouterAction[actionName as keyof typeof handleRouterAction];
    try {
      await executer(req, res);      
    } catch (error) {
      console.log(`Some error: ${error}`);
      res.status(500).json({ error: "Server" });
    }
  } else {
    res.status(404).json({ error: "Unknown action" });
  }
})

export default router