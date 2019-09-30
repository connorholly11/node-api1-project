// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.get("/", (req, res) => {
  res.send("HELLO WORLD from node api project");
});

//post users - GETTING A 400, but I think it's working
server.post("/users", (req, res) => {
  const newUser = req.body;

  db.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(400).json({
        err: err,
        message: "Please provide name and bio for the user."
      });
    })
    .catch(error => {
      res.status(500).json({
        err: error,
        message: "There was an error while saving the user to the database"
      });
    });
});

//get users - WORKING
server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: "ALERT, THERE IS AN ERROR - get /users"
      });
    });
});

//get user id - WORKING
server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log("id", id);

  db.findById(id)
    .then(getUser => {
      res.json(getUser);
      console.log("get user", getUser);
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: "ALERT, THERE IS AN ERROR - get /users/:id"
      });
    });
});

//delete user id - WORKING
server.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(deletedUser => {
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res.status(404).json({
          message: "404 not found!!!"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: "ALERT, THERE IS AN ERROR - delete /users/:id"
      });
    });
});

server.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  console.log("id", id);
  console.log("changes", changes);

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({
          message: "404 not found updating"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: "ALERT, THERE IS AN ERROR - put /users/:id"
      });
    });
});

server.listen(5000, () => {
  console.log("API up and running on port 5000");
});
