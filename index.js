// implement your API here
const express = require("express");
const db = require("./data/db");

const server = express();

server.get("/", (req, res) => {
  res.send("HELLO WORLD from node api project");
});

//post users - GETTING A 400
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
});

// POST	/api/users	Creates a user using the information sent inside the request body.
// GET	/api/users	Returns an array of all the user objects contained in the database.
// GET	/api/users/:id	Returns the user object with the specified id.
// DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.

server.listen(5000, () => {
  console.log("API up and running on port 5000");
});
