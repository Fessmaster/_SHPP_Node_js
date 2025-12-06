import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import bcrypt from "bcrypt";
import createSession from "./middleware/session";
import { Task, Login, MyRequest} from "./models/types";
import { readFile, rewriteList, userEntry } from "./utils/fileStorege";

import { isUser } from "./middleware/isUser";

const app = express();
const port = 3005;
const sessionConfig = createSession();
const filePathToTasks = path.join(__dirname, "../public/listOfTasks.json");
const filePathToLogins = path.join(__dirname, "../public/listOfLogins.json");

app.use(sessionConfig);
app.use(express.json());
app.use(express.static("public"));

app.get("/api/v1/items", isUser, async (req: MyRequest, res) => {
  const owner = req.session.user?.login;
  const tasks: Array<Task> = await readFile(filePathToTasks);
  let userTasks: Array<Task> = [];
  if (owner && tasks) userTasks = tasks.filter((task) => task.owner === owner);
  res.json({
    items: userTasks,
  });
});

app.post("/api/v1/login", async (req: MyRequest, res) => {
  const login: string = req.body.login;
  const password: string = req.body.pass;

  if (!login || !password) {
    res.status(400).json({ error: "Fields can't be empty" });
    return;
  }

  const entry = await userEntry(login);
  if (!entry || !entry?.password) {
    res.status(401).json({ error: "Login or password incorrect" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, entry?.password);
  if (!isPasswordValid) {
    res.status(401).json({ error: "Login or password incorrect" });
    return;
  }

  req.session.user = { login: login };
  res.json({
    ok: true,
  });
});

app.post("/api/v1/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(`Some trouble: ${err}`);
  });
  res.clearCookie("connect.sid");
  res.json({ ok: true });
});

app.post("/api/v1/register", async (req, res) => {
  const login = req.body.login;
  const password = req.body.pass;
  const listOfLogins: Array<Login> = await readFile(filePathToLogins);
  const entry = await userEntry(login);
  if (typeof entry !== "undefined") {
    res.status(409).json({ error: "This name of user already exist" });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPas = await bcrypt.hash(password as string, salt);
  listOfLogins.push({ login: login, password: hashedPas });
  await rewriteList(filePathToLogins, listOfLogins);
});

app.post("/api/v1/items", isUser, async (req: MyRequest, res) => {
  const newTask = req.body.text;
  const owner = req.session.user?.login;
  const listOfTasks: Array<Task> = await readFile(filePathToTasks);
  let ID =  (listOfTasks[listOfTasks.length - 1]?.id ?? 0);
  if (!owner) {
    res.status(401).json({ error: "Forbidden" });
    return;
  } 
  listOfTasks.push({ id: ++ID, text: newTask, checked: false, owner: owner });
  rewriteList(filePathToTasks, listOfTasks);
  res.json({
    id: ID,
    text: newTask,
    checked: false,
  });
});

app.put("/api/v1/items", isUser, async (req: MyRequest, res) => {
  const listOfTasks: Array<Task> = await readFile(filePathToTasks);
  const item = listOfTasks.find((item) => item.id === req.body.id);

  if (!item) {
    res.status(404).json({ error: `Task not found` });
    return
  } 
  if (item.owner!==req.session.user?.login){
    res.status(401).json({ error: "Forbidden" });
    return;
  } 

  Object.assign(item, req.body);
  rewriteList(filePathToTasks, listOfTasks);
  res.json({ ok: true });
});

app.delete("/api/v1/items", isUser, async (req: MyRequest, res) => {
  let listOfTasks: Array<Task> = await readFile(filePathToTasks);
  const item = listOfTasks.find((item) => item.id === req.body.id);

  if (!item) {
    res.status(404).json({ error: `Task not found` });
    return;
  }
  if (item.owner!==req.session.user?.login){
    res.status(401).json({ error: "Forbidden" });
    return;
  } 
  listOfTasks = listOfTasks.filter((confirmed) => confirmed.id !== item.id);
  rewriteList(filePathToTasks, listOfTasks);
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Server was started on port ${port}`);
});
