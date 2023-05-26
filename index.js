const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const axios = require('axios')
const app = express();

//Middlewares

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

//! app.use(cors({ credentials: true }));

let token = "7a55204fb9d7076b6d73b3bc5d8ed2849d86a26e";

app.use(cors());

app.use(cookieParser("secretcode"));

//Server listen settings

const PORT = 5000;

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
