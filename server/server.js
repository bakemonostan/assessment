import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import usersRoute from "./routes/users-route.js";
import authRoutes from './routes/auth-routes.js'
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
// const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use(json());
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
