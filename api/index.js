const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h2>Welcome Hipermedia API</h2>");
});

app.post("/message", async (req, res) => {
  setTimeout(() => {
    res.send("<h3>Hello world</h3>");
  }, 5000);
});

app.post("/echo_payload", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  res.send(`<div>
    <b>Email: </b> ${email} <br />
    <b>Password: </b> ${password}
    </div>`);
});

const PORT = process.env.PORT || 1330;

app.listen(PORT, () => {
  console.log(`App is now running on port: ${PORT}`);
});
