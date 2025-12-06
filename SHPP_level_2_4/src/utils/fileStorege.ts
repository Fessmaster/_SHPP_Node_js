import fs from "fs/promises";
import path from "path";
import { Task, Login } from "../models/types";

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

export async function rewriteList(path: string, list: Array<Task> | Array<Login>) {
  fs.writeFile(path, JSON.stringify(list));
}

export async function userEntry(login: string): Promise<Login | undefined> {
  const loginList: Array<Login> = await readFile(filePathToLogins);
  const user = loginList.find((entry) => entry.login === login);
  return user;
}