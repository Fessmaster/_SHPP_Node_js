import User, { IUser } from "../models/User";
import Task, { ITask } from "../models/Task";
import { Response } from "express";
import { MyRequest } from "../models/types";



export const handleRouterAction = {
  getItems: async (req: MyRequest, res: Response) => {    
    if (!req.session.user) {
      res.status(401).json({ error: "forbidden" });
      return;
    }

    const owner = req.session.user?.login;
    const user = await User.findOne({ login: owner });
    const id = user?._id;
    const userTasks = await Task.find({ user: id });
    res.json({
      items: userTasks,
    });
  },

  createItem: async (req: MyRequest, res: Response) => {
    const newTask = req.body.text;     

    createNewTask({ text: newTask, user: req.session.user?.id, });
    res.json({
      id: req.session.user?.id,
      text: newTask,
      checked: false,
    });
  },

  editItem: async (req: MyRequest, res: Response) => {
    const task = await Task.findOne({ _id: req.body.id });

    if (!task) {
      res.status(404).json({ error: `Task not found` });
      return;
    }

    const updatedTask: Partial<ITask> = {
      text: req.body.text,
      checked: req.body.checked,
    };
    const isUpdate = await updateTask(task._id.toString(), updatedTask);
    if (!isUpdate) {
      res.status(404).json({ error: "Task not find" });
      return;
    }
    res.json({ ok: true });
  },

  deleteItem: async (req:MyRequest, res:Response) => {
      const task = await Task.findOne({_id: req.body.id})
    
      if (!task) {
        res.status(404).json({ error: `Task not found` });
        return;
      }

      const isDelete = await deleteTask(task._id.toString());
      if (!isDelete){
        res.status(404).json({ error: "Task not find" });
        return;
      }  
      res.json({ ok: true });
  },

  register: async (req: MyRequest, res: Response) => {
    const login = req.body.login;
    const password = req.body.pass;
    const entry = await userEntry(login);
    if (entry !== null) {
      res.status(409).json({ error: "This name of user already exist" });
      return;
    }
    const user = {
      login: login,
      password: password,
    };
    createNewUser(user);
    res.json({ ok: true });
  },

  login: async (req: MyRequest, res: Response) => {
    const login: string = req.body.login;
    const password: string = req.body.pass;

    if (!login || !password) {
      res.status(400).json({ error: "Fields can't be empty" });
      return;
    }

    const entry = await userEntry(login);
    if (!entry || !entry?.password) {
      res.status(401).json({ error: 'not found' });
      return;
    }

    const isPasswordValid = await entry.isPasswordCorrect(password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'not found' });
      return;
    }
    
    req.session.user = { login: login, id: entry?._id.toString()  };    
    res.json({
      ok: true,
    });
  },

  logout: async (req: MyRequest, res: Response) => {
    req.session.destroy((err) => {
      if (err) console.log(`Some trouble: ${err}`);
    });
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  },
};


export async function createNewUser(user: Partial<IUser>) {
  try {
    const newUser = new User(user);
    const savedUser = await newUser.save();

    console.log(`Додано користувача: ${savedUser}`);
  } catch (error) {
    console.log(`Помилка при додаванні користувача ${error}`);
  }
}

export async function updateTask(
  taskId: string,
  task: Partial<ITask>
): Promise<boolean> {
  try {
    const update = await Task.findByIdAndUpdate(taskId, task, { new: false });
    if (update) {
      console.log(`Завдання оновлено`);
    }
    return true;
  } catch (error) {
    console.log("Помилка при оновленні завдання");
    return false;
  }
}

export async function deleteTask(id: string): Promise<boolean> {
  try {
    const isDelate = await Task.findByIdAndDelete({ _id: id });
    if (isDelate) {
      console.log("Завдання видалено");
      return true;
    }
  } catch (error) {
    console.log("Помилка при видаленні завдання");
  }
  return false;
}

export async function createNewTask(task: Partial<ITask>) {
  try {
    const newTask = new Task(task);
    const savedTask = await newTask.save();

    console.log(`Додано нове завдання: ${savedTask}`);
  } catch (error) {
    console.log(`Помилка при додаванні завдання ${error}`);
  }
}

export async function userEntry(login: string): Promise<IUser | null> {
  const user = await User.findOne({ login: login });
  return user;
}
