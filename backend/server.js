const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<h2 style='text-align: center; margin-top: 40vh; font-size: 60px'>Welcome to order management server...</h2>"
    );
});

app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/bills", require("./routes/billsRoute"));

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("App connected to DB Successfully");
    })
    .catch((error) => {
      console.log(`Error => ${error.message}`);
    });
  console.log(`Server started on PORT ${PORT}`);
});
