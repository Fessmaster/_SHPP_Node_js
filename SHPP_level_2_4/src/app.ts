import dotenv from "dotenv";
dotenv.config();
import express from "express";
import createSession from "./middleware/session";
import itemsRout from "./routes/tasks"
import authRout from "./routes/authorization"
import connectDB from "./config/db";
import router from "./routes/router"

const app = express();
const port = 3005;
const sessionConfig = createSession();

connectDB();

app.use(sessionConfig);
app.use(express.json());
app.use(express.static("public"));

// app.use('/api/v1',authRout);
// app.use('/api/v1/items', itemsRout);
app.use('/api/v2/router', router);


app.listen(port, () => {
  console.log(`Server was started on port ${port}`);
});
