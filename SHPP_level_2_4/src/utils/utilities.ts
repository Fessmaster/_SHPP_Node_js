import fs from "fs/promises";
import path from "path";

import User, { IUser } from "../models/User";
import Task, { ITask } from "../models/Task";
import { ObjectId } from "mongoose";

const filePathToLogins = path.join(__dirname, "../../public/listOfLogins.json");

export async function readFile(path: string) {
  try {
    const list = JSON.parse(await fs.readFile(path, { encoding: "utf8" }));
    return list;
  } catch (error: any) {
    console.log("Reading error", error.message);
    fs.writeFile(path, JSON.stringify([]));
    return [];
  }
}

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

export async function deleteTask(id:string): Promise<boolean> {
  try {
    const isDelate = await Task.findByIdAndDelete({_id: id});
    if (isDelate) {
      console.log('Завдання видалено');
      return true;
    }
  } catch (error) {
    console.log('Помилка при видаленні завдання');    
  }
  return false
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
