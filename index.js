const express = require("express");
const env = require("dotenv").config();
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use("/user", userRoutes);
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  try {
    res.json({ message: "Server Started Successfully" });
  } catch (error) {
    res.json({ message: `Error occured : ${error}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server started successfully on port number : ${PORT}`);
  connectDB();
});


