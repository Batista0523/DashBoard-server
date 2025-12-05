import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import Auth from "./Controllers/authControllers";
import Users from "./Controllers/userConstrollers";
import SavedCripto from "./Controllers/savedCrypto";
import SavedCity from "./Controllers/savedCitiesControllers";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/users", Users);
app.use("/auth", Auth);
app.use("/savedCity" , SavedCity)
app.use("/savedCoins", SavedCripto)
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the dashboard 🚀");
});

export default app;
