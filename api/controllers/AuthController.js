const authController = require("express").Router();
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

// Register a new user
authController.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const isExisting = await UserModel.findOne({ username });

  if (isExisting) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    const userDoc = await UserModel.create({
      username,
      email,
      password: bcrypt.hashSync(password, saltRounds),
    });

    jwt.sign(
      { username, email, id: userDoc._id },
      process.env.SECRET_KEY,
      (err, token) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.cookie("token", token).json({ username, email, id: userDoc._id });
        }
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

// Login an existing user
authController.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await UserModel.findOne({ username });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      jwt.sign(
        { username, email: userDoc.email, id: userDoc._id },
        process.env.SECRET_KEY,
        (err, token) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.cookie("token", token).json({
              username,
              email: userDoc.email,
              id: userDoc._id,
            });
          }
        }
      );
    } else {
      res.status(400).json({ error: "Invalid username or password" });
    }
  } else {
    res.status(400).json({ error: "Invalid username or password" });
  }
});

// Logout a user
authController.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

// get user profile from cookies
authController.get("/profile", async (req, res) => {
  const token = req.cookies.token;

  jwt.verify(token, process.env.SECRET_KEY, (err, info) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(info);
    }
  });
});

// get user profile from id
authController.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await UserModel.findById(id);
    res.json({ username: userData.username, email: userData.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = authController;
