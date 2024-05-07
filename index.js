const express  = require("express");
const mongoose  =  require("mongoose");
const dotenv = require("dotenv");
const helmet =require("helmet");
const morgon = require("morgan");
dotenv.config();
const app = express();
const userRouter  = require("./routes/users");
const authRouter  = require("./routes/auth");
const postRoute = require("./routes/posts");

 // Connect to MongoDB using async/await
 (async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true // Remove the useCreateIndex option
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();




//middleware
app.use(express.json());
app.use(helmet());
app.use(morgon("common"));


 
app.use("/api/users",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/posts", postRoute);
 
 







app.listen(3000);