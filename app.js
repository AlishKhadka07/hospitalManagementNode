const express = require("express");
const app = express();
const db = require("./model/index");
const cors = require("cors");
const authRoute = require("./routes/authRoute");

require("dotenv").config();
db.sequelize.sync({ force: 0 });
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));


//api routes
app.use("/api/user", authRoute);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
