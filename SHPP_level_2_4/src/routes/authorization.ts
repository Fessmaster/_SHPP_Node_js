
import { Router } from "express";
import { MyRequest } from "../models/types";
import { userEntry, createNewUser } from "../utils/utilities";

const router = Router();

router.post("/login", async (req: MyRequest, res) => {
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

  const isPasswordValid = await entry.isPasswordCorrect(password);
  if (!isPasswordValid) {
    res.status(401).json({ error: "Login or password incorrect" });
    return;
  }

  req.session.user = { login: login };
  res.json({
    ok: true,
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(`Some trouble: ${err}`);
  });
  res.clearCookie("connect.sid");
  res.json({ ok: true });
});

router.post("/register", async (req, res) => {
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
  }
  createNewUser(user)
  
});

export default router;