const express = require("express");
const pool = require("../db.js");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { authenticateToken } = require("../middleware/authorization.js");
const { jwtTokens } = require("../utils/jwt-helpers.js");

// import express from "express";
// import pool from "../db.js";
// import bcrypt from "bcrypt";
// require("dotenv").config();
// import { authenticateToken } from "../middleware/authorization.js";
// import { jwtTokens } from "../utils/jwt-helpers.js";

const usersRoute = express.Router();

/* GET users listing. */
usersRoute.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json({ users: users.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

usersRoute.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
      [req.body.name, req.body.email, hashedPassword]
    );
    res.json(jwtTokens(newUser.rows[0]));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

usersRoute.delete("/", async (req, res) => {
  try {
    const users = await pool.query("DELETE FROM users");
    res.status(204).json(users.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = usersRoute;
