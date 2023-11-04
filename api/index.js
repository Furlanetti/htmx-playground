const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("<h2>Welcome Hipermedia API</h2>");
});

app.get("/delayed", (req, res) => {
  setTimeout(() => {
    res.send("<h2>Welcome Hipermedia API</h2>");
  }, 7000);
});

app.post("/message", async (req, res) => {
  res.send("<h3>Hello world</h3>");
});

app.post("/oob", async (req, res) => {
  res.send(`<div>
    <h3 id="target2" hx-swap-oob="true">Hello world</h3>
    This goes into the main target
  </div>`);
});

app.post("/selecting_response", async (req, res) => {
  res.send(`<div>
    <h3 id="target2">Hello world</h3>
    This goes into the main target
  </div>`);
});

app.post("/echo_payload", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  res.send(`<div>
    <b>Email: </b> ${email} <br />
    <b>Password: </b> ${password}
    </div>`);
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  console.log(filePath);

  res.send(`<b>Upload successfully</b>: ${filePath}`);
});

const PORT = process.env.PORT || 1330;

app.listen(PORT, () => {
  console.log(`App is now running on port: ${PORT}`);
});
