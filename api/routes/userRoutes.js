const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//REGISTER
router.post("/register", async (req, res) => {
  //Checking if the user is already in the db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    bio: req.body.bio,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
    //res.send({user._id})
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //Checking email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");

  //Checking password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  //Create and assign a token
  const token = jwt.sign(
    {
      _id: user._id,
      //name: user.name,
    },
    "abc123",
    {
      expiresIn: "1d",
    }
  );
  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token,
  });
});

//Follow User

//Unfollow User

//Get all user
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

//Get user by id
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
  }
});

module.exports = router;
