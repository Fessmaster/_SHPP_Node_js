import dotenv from "dotenv";
dotenv.config();
import express from "express";
import createSession from "./middleware/session";
import connectDB from "./config/db";
import router from "./routes/router";
import cors from "cors";

const app = express();
const port = 3005;
const sessionConfig = createSession();
const corsOption = {
  credentials: true,
  origin: ["http://127.0.0.1:5501", "http://localhost:5501"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
connectDB();

app.use(cors(corsOption));
app.use(sessionConfig);

app.use(express.json());
app.use(express.static("public"));

app.use("/api/v2/router", router);

app.listen(port, () => {
  console.log(`Server was started on port ${port}`);
});
