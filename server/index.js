const express = require("express");
const cors = require("cors");
const { dirname, join } = require("path");

const cookieParser = require("cookie-parser");
const usersRoute = require("./routes/users-route.js");
const authRoutes = require('./routes/auth-routes.js')

// import cors from "cors";
// import { dirname, join } from "path";
// import { fileURLToPath } from "url";
// import cookieParser from "cookie-parser";
// import usersRoute from "./routes/users-route.js";
// import authRoutes from './routes/auth-routes.js'

require("dotenv").config();


// const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use(express.json());
app.use(cookieParser());
// app.use(express.static(join(__dirname, "public")));
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;