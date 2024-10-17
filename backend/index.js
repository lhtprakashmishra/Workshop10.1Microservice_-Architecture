import Express from "express";
import Cors from "cors";
import db from "./connection/registrationConnection.js";
import routes from "./routes/routes.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const url = process.env.URI;

dotenv.config();

const app = Express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", Express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT;

app.use(Cors());
app.use(Express.json());
db(url);

app.use("/", routes);

app.listen(port, console.log(`Listening at ${process.env.PORT}`));
