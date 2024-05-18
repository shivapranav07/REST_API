const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const zod = require("zod");
const { token } = require("morgan");
//zod validation
const registerBody = zod.object({
  username:zod.string(),
  email:zod.string(),
  password:zod.string()

})

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const {success}=registerBody.safeParse(req.body);
    if(!success){
      return res.status(411).json({message:"incorrect inputs"});
    }
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const existingUser = await User.findOne({
      username: req.body.username
    });
  
    if (existingUser) {
      return res.status(411).json({
        message: "username already exists"
      });
    }

    //create new user
    const newUser = await  User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
     const userId = newUser._id;
     const token = jwt.sign({
      userId
     },JWT_SECRET)

    res.json({
      message :"user created sucessfully",
    token:token});
  } catch (err) {
    res.status(500).json({"message":"something went wrong"})
  }
});


const loginBody = zod.object({
  email:zod.string(),
  password:zod.string()
})

router.post("/login", async (req, res) => {
  try {
    const { success } = loginBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({ message: "Incorrect inputs" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (validPassword) {
      const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: '1h' } // You can specify the token expiry time
      );
      return res.status(200).json({ user, token });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router