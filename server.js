const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/", (req, res) => {
  res.send("POST request to the homepage");
});

app.get("/about", (req, res) => {
  res.send("about");
});

app.post("/login", (req, res) => {
  res.send("POST request to login user!");
});

app.post("/logout", (req, res) => {
  res.send("POST request to logout user!");
});

app.get('/users/:id/', (req, res) => {
   res.send(req.params)
 }) 

app.all("/secret", (req, res, next) => {
  console.log("Accessing the secret section ...");
  next(); // pass control to the next handler
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
