const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require("./config");
const Sport = require("./models/sport-model");
const uuid = require("uuid");

const app = express();

app.use(jsonParser);

/* Your code goes here */

app.delete("/sports/delete", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.statusMessage = "Not acceptable no ID found in body";
    return res.status(406).end();
  }
  const { sportId } = req.query;
  if (!sportId) {
    res.statusMessage = "Not acceptable no sportId param found in url";
    return res.status(406).end();
  }
  if (sportId !== id) {
    res.statusMessage = "IDs do not match";
    return res.status(409).end();
  }
  const exists = await Sport.exists({ id: id });
  if (!exists) {
    res.statusMessage = "Sport does not exist";
    return res.status(404).end();
  }
  Sport.findOneAndDelete({ id: id })
    .then(() => {
      res.statusMessage = "Succesfully deleted";
      res.status(204).end();
    })
    .catch((err) => {
      res.statusMessage = "An error ocurred while deleting";
      res.status(500).end();
    });
});

app.post("/sports/create", (req, res) => {
  req.body.id = uuid.v4();
  const validSport = new Sport(req.body);

  validSport
    .save()
    .then((sport) => {
      console.log("saved");
      res.json({ sport });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

app.get("/sports", (req, res) => {
  Sport.find()
    .then((sports) => {
      res.json({ sports });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

app.listen(PORT, () => {
  console.log("This server is running on port 8080");
  new Promise((resolve, reject) => {
    const settings = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    mongoose.connect(DATABASE_URL, settings, (err) => {
      if (err) {
        return reject(err);
      } else {
        console.log("Database connected successfully.");
        return resolve();
      }
    });
  }).catch((err) => {
    console.log(err);
  });
});
