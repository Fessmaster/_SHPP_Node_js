import { Router } from "express";
import { MyRequest} from "../models/types";
import { createNewTask, deleteTask, updateTask } from "../utils/utilities";
import { isUser } from "../middleware/isUser";
import Task, { ITask } from "../models/Task";
import User from "../models/User";

const router = Router();

router.get("/", isUser, async (req: MyRequest, res) => {
  const owner = req.session.user?.login;
  const user = await User.findOne({login: owner});
  const id = user?._id  
  const userTasks= await Task.find({user: id});
  res.json({
    items: userTasks,
  });
});

router.post("/", isUser, async (req: MyRequest, res) => {
  const newTask = req.body.text;
  const owner = req.session.user?.login;
  const user = await User.findOne({login: owner});  
  if (!owner) {
    res.status(401).json({ error: "Forbidden" });
    return;
  }
  if (user === null){
    res.status(401).json({ error: "Forbidden" });
    return;
  }  
  createNewTask({text: newTask, user: user._id})  
  res.json({
    id: user._id.toString(),
    text: newTask,
    checked: false,
  });
});

router.put("/", isUser, async (req: MyRequest, res) => {

  const task = await Task.findOne({_id: req.body.id})
  const user = await User.findOne({_id: task?.user}); 

  if (!task) {
    res.status(404).json({ error: `Task not found` });
    return
  } 
  if (user?.login!==req.session.user?.login){
    res.status(401).json({ error: "Forbidden" });
    return;
  } 
  const updatedTask: Partial<ITask> = {
    text: req.body.text,
    checked: req.body.checked
  }  
  const isUpdate = await updateTask(task._id.toString(), updatedTask)
  if(!isUpdate){
    res.status(404).json({ error: "Task not find" });
    return;
  }  
  res.json({ ok: true });
});

router.delete("/", isUser, async (req: MyRequest, res) => {

  const task = await Task.findOne({_id: req.body.id})
  const user = await User.findOne({_id: task?.user}); 

  if (!task) {
    res.status(404).json({ error: `Task not found` });
    return;
  }
  if (user?.login!==req.session.user?.login){
    res.status(401).json({ error: "Forbidden" });
    return;
  } 
  const isDelete = await deleteTask(task._id.toString());
  if (!isDelete){
    res.status(404).json({ error: "Task not find" });
    return;
  }  
  res.json({ ok: true });
});


export default router;