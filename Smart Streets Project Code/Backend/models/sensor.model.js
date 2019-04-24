const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

// Define collection and schema for Sensor
let Sensor_Manisha = new Schema(
  {
    clusterId: String,
    smartNodeId: String,
    sensorNodeId: String,
    sensorType: String,
    sensorName: String,
    sensorValue: String
  },
  {
    timestamps: true
  },
  {
    collection: "sensor"
  }
);

Sensor_Manisha.index({
  clusterId: 1
});
Sensor_Manisha.index({
  smartNodeId: 1
});

Sensor_Manisha.plugin(mongoosePaginate);
module.exports = mongoose.model("Sensor_Manisha", Sensor_Manisha);
