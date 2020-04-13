const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/load", (req, res) => {
  fs.readFile("db/player1.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.error(err);
      return;
    } else {
      res.send(JSON.stringify(data) );
    }
  });
});

app.post("/", (req, res) => {
  res.send("POST request to the homepage");
});

app.post("/login", (req, res) => {
  res.send("POST request to login user!");
});

app.post("/logout", (req, res) => {
  res.send("POST request to logout user!");
});

app.get("/about", (req, res) => {
  res.send("about");
});

app.get("/users/:id/", (req, res) => {
  res.send(req.params);
});

app.all("/secret", (req, res, next) => {
  console.log("Accessing the secret section ...");
  next(); // pass control to the next handler
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server listening on port ${port}`));
