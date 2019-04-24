// sensor.route.js

const express = require("express");
const sensorRoutes = express.Router();

// Require Sensor model in our routes module
let Sensor = require("./models/sensor.model");

// Defined store route
sensorRoutes.route("/add").post(function(req, res) {
  let sensor = new Sensor(req.body);
  sensor
    .save()
    .then(sensor => {
      res.status(200).json(sensor);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
sensorRoutes.route("/").get(function(req, res) {
  page = req.query.page;
  size = req.query.size ? Number(req.query.size) : 5;
  Sensor.paginate({}, { page: page, limit: size }, function(err, sensors) {
    if (err) {
      console.log(err);
    } else {
      res.json(sensors);
    }
  });
});

sensorRoutes.route("/search").get(function(req, res) {
  clusterId = req.query.clusterId;
  smartNodeId = req.query.smartNodeId;

  fromDateString = req.query.fromDate;
  toDateString = req.query.toDate;

  page = req.query.page;
  size = req.query.size ? Number(req.query.size) : 5;
  query = {};
  if (clusterId) {
    query["clusterId"] = clusterId;
  }
  if (smartNodeId) {
    query["smartNodeId"] = smartNodeId;
  }
  var fromDate = new Date(fromDateString);
  var toDate = new Date(toDateString);

  dateQuery = {};
  if (fromDateString != undefined && toDateString != undefined) {
    dateQuery = {
      $gte: fromDate,
      $lt: toDate
    };
  } else if (fromDateString != undefined) {
    dateQuery = {
      $gte: fromDate
    };
  } else if (toDateString != undefined) {
    dateQuery = {
      $lt: toDate
    };
  }

  if (fromDateString != undefined || toDateString != undefined) {
    query["createdAt"] = dateQuery;
  }

  console.log(query);
  var options = {
    page: page,
    limit: size
  };
  console.log(options);
  Sensor.paginate(query, options).then(function(sensors) {
    res.json(sensors);
  });
});

// Defined edit route
sensorRoutes.route("/edit/:id").get(function(req, res) {
  let id = req.params.id;
  Sensor.findById(id, function(err, sensor) {
    res.json(sensor);
  });
});

//  Defined update route
sensorRoutes.route("/update/:id").post(function(req, res) {
  Sensor.findById(req.params.id, function(err, sensor) {
    if (!sensor) res.status(404).send("data is not found");
    else {
      sensor.clusterId = req.body.clusterId;
      sensor.smartNodeId = req.body.smartNodeId;
      sensor.sensorNodeId = req.body.sensorNodeId;
      sensor.sensorType = req.body.sensorType;
      sensor.sensorName = req.body.sensorName;
      sensor.sensorValue = req.body.sensorValue;
      sensor
        .save()
        .then(sensor => {
          res.json("Update complete");
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
sensorRoutes.route("/delete/:id").get(function(req, res) {
  Sensor.findByIdAndRemove({ _id: req.params.id }, function(err, sensor) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});

module.exports = sensorRoutes;
