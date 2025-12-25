const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/signupDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

app.get("/", (req, res) => {
  res.send("Backend OK");
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/users", async (req, res) => {
  try {
    console.log(req.body); 

    const user = new User(req.body);
    await user.save();

    res.json({ message: "Signup success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving user" });
  }
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});
