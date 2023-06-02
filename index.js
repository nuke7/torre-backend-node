const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

//Middlewares
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//Server listen settings

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

//Routes

app.get("/data", async (req, res) => {
  try {
    const userData = await axios.get(`https://torre.bio/api/bios/torrenegra`);

    res.json(userData.data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/data/:userName", async (req, res) => {
  const userName = req.params.userName;
  try {
    const userData = await axios.get(`https://torre.bio/api/bios/${userName}`);

    res.json(userData.data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

