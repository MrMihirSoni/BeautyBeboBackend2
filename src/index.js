const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connection = require("./configs/db");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");
const addressRouter = require("./routes/address.routes");
const auth = require("./middlewares/auth.middleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin:["https://beautybebobackend-production.up.railway.app", "http://localhost:5173", "https://mihirsoni-beautybebo.netlify.app"],
  credentials:true
}));
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cart", auth, cartRouter);
app.use("/address", auth, addressRouter)

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to Beauty Bebo!" });
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${PORT} and DB is also connected`);
  } catch (error) {}
});
