require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./routes");
app.use(router);

const PORT = process.env.PORT | 8080;

app.listen(PORT, () => console.log(`listen on ${PORT}`));
