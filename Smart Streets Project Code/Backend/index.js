//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var request = require('request');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var {Nodes} = require('./models/node');
var {Sensors} = require('./models/sensor')
var {Users} = require('./models/user')
var {SensorValues} = require('./models/sensorValue')
var {mongoose} = require('./db/mongoose');
var moment = require('moment');
var dateFormat= require('dateformat')
var routes = require('./routes')
var user = require('./routes/user')
var AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
var cmd=require('node-cmd');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtkey = require('./config/keys');
const sensorRoute = require("./sensor.route");


// app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());
// app.use(favicon());
// app.use(express.logger('dev'));
// app.use(express.methodOverride());
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

//   var Users = [{
//       username : "admin",
//       password : "admin"
//   }]

//Route to handle Post Request Call
// app.post('/login',function(req,res){
//     console.log("Inside Login Post Request");
//     //console.log("Req Body : ", username + "password : ",password);
//     console.log("Req Body : ",req.body);
//     Users.filter(function(user){
//         if(user.username === req.body.username && user.password === req.body.password){
//             res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//             req.session.user = user;
//             res.writeHead(200,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Successful Login");
//         }
//     })

    
// });
app.post('/login', function(req,res){  

    var emailid = req.body.emailid;
    var password = req.body.password;
    console.log("emailid:",emailid + " password:",password);
    emailstring = emailid.replace("%40", "@")
    console.log("Setting up login for :", emailstring);
    
    Users.findOne({
        emailid: req.body.emailid
    }, function(err,user){
        if (err) {
            console.log("err");
            res.code = "201";
            res.value = "Incorrect emailid and password";
            console.log(res.value);
            res.sendStatus(201).end(); 
        }
        else if(user==null){
            res.code = "201";
            res.value = "User does not exist in the database";
            console.log(res.value);
            res.sendStatus(201).end(); 
        }
        else if(user.password){
            bcrypt.compare(req.body.password, user.password, function(err, results) {
                console.log('User pwd ', req.body.password)
                console.log('Pwd in Database ', user.password)
         if(results){
    /*         res.writeHead(200,{
                'Content-Type' : 'application-json'
            }) */
            jwt.sign({ user: user }, jwtkey.secret, { expiresIn: '10080s' }, (err, token) => {
                console.log("token : " + token)
                var values = {
                    token: 'JWT ' + token
                }
                /* res.cookie('cookie',emailstring,{maxAge: 900000, httpOnly: false, path : '/'});  */
                req.session.user = user;
                console.log(req.session.user);
                res.status(200).json(values);
            });         
         }
            });
         }
    })
})

app.post('/signup', function(req,res){
    console.log("Inside sign up")
    var salt = bcrypt.genSaltSync(10);
    var encryptedpassword = bcrypt.hashSync(req.body.password, salt);
    var user = new Users({
        emailid : req.body.emailid,
        password : encryptedpassword,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        usertype : req.body.usertype,
    })

    user.save().then((user) => {
        console.log("User : " + user);
        res.code = "200";
        res.sendStatus(200).end();
    },(err) =>{
        res.sendStatus(400).end();
    })
})

//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){

    Nodes.find({
    }, function(err,nodelist){
        console.log("Inside node home")
        if (err) {
            console.log("err");
            res.code = "400";
            res.value = "Fetching node list failed";
            console.log(res.value);
            res.sendStatus(400).end(); 
        } else{
            console.log("success")
            res.code = "200";
            res.value = nodelist;
            console.log("Node list fetched" + JSON.stringify(nodelist));
            res.send(JSON.stringify(nodelist));
        }
    })
    
})

//Get data for all sensors 
//Route to get All Books when user visits the Home Page
app.get('/sensorhome/:nodeid', function(req,res){

    Sensors.find({
        nodeid : req.params.nodeid
    }, function(err,sensorlist){
        console.log("Inside sensor home")
        if (err) {
            console.log("err");
            res.code = "400";
            res.value = "Fetching sensor list failed";
            console.log(res.value);
            res.sendStatus(400).end(); 
        } else{
            console.log("success")
            res.code = "200";
            res.value = sensorlist;
            console.log("Sensor list fetched" + JSON.stringify(sensorlist));
            res.send(JSON.stringify(sensorlist));
        }
    })
    
})

//Create Post request
app.post('/create',function(req,res){
       
  //inserting data of node in db
        console.log("Inside create node" + JSON.stringify(req.body.Latitude));
        var nodeid = req.body.NodeID
        var node_status = req.body.Status
        var lat = req.body.Latitude
        var long = req.body.Longitude
        var no_sensors = req.body.NoSensors
        var clusterid = req.body.ClusterID
        var installation_date = req.body.InstallationDate

        Nodes.findOneAndUpdate(
            {nodeid: nodeid}, // find a document with that filter
            {
                $set : {
                    nodeid,
                    node_status,
                    lat,
                    long,
                    no_sensors,
                    clusterid,
                    installation_date
                }
            }, // document to insert when nothing was found
            {upsert: true, new: true, runValidators: true}, // options
            function (err, doc) { // callback
                if (err) {
                    // handle error
                    console.log(err);
                    res.code = "200";
                    res.sendStatus(400).end();
                } else {
                // handle document
                console.log("Sensor node updated " + doc);
                res.code = "200";
                res.body = doc;
                res.status(200).send(doc);
                }
            });

});

//Route to get All sensorreadings when user visits the Home Page
// app.get('/sensorreadings', function(req,res){

//     SensorReadings.find({
//     }, function(err,sensorreadings){
//         console.log("Inside sensor readings")
//         if (err) {
//             console.log("err");
//             res.code = "400";
//             res.value = "Fetching sensor readings data failed";
//             console.log(res.value);
//             res.sendStatus(400).end(); 
//         } else{
//             console.log("success")
//             res.code = "200";
//             res.value = sensorreadings;
//             console.log("Sensor readings fetched" + JSON.stringify(sensorreadings[0]));
//             res.send(sensorreadings[0]);
//         }
//     })
    
// })

app.delete('/delete/:NodeID', function(req,res){
    console.log("Inside Delete" + req.params.NodeID);  
   
    Nodes.findOneAndDelete({
        nodeid : req.params.NodeID
    }, function (err, result) {

        if (err) {

            console.log("error in deleting");
            res.sendStatus(400).end();

        } else {

            console.log(result);
            res.sendStatus(200).end();

        }

    });


    });

//TESTING NEW CREATE SENSOR DATA
//Create Post request
app.post('/sensorReadings',function(req,res){
    var timestamp1 = moment(req.body.timestamp).format("DD/MM/YYYY h:mm:ss");
    var sensorValues = new SensorValues({
        sensorNodeId : req.body.sensorid,
        sensorName : req.body.sensorname,
        sensorType : req.body.sensortype,
        sensorValue : req.body.sensorvalue,
        timestamp1 : timestamp1,
        timestamp2 : req.body.timestamp2,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        smartNodeId : req.body.nodeid,
        clusterId : req.body.clusterid,

    })
    
    sensorValues.save().then((sensorValues) => {
        console.log("Readings : " + sensorValues);
        res.code = "200";
        res.sendStatus(200).end();
    },(err) =>{
        console.log("Error in temp data" + err)
        res.sendStatus(400).end();
    })

});

//Create Post request
// app.post('/humiditysensor',function(req,res){
   
//     var humidityreadings = new HumidityReadings({
//         sensorid : req.body.sensorid,
//         relativehumidity : req.body.relativehumidity,
//         timestamp : req.body.timestamp,
//     })
    
//     humidityreadings.save().then((humidityreadings) => {
//         console.log("Realtive Humidity % Readings : " + humidityreadings);
//         res.code = "200";
//         res.sendStatus(200).end();
//     },(err) =>{
//         console.log("Error in relative humidity data" + err)
//         res.sendStatus(400).end();
//     })

// });

// //Create Post request
// app.post('/windsensor',function(req,res){
   
//     var windspeedreadings = new WindSpeedReadings({
//         sensorid : req.body.sensorid,
//         windspeed : req.body.windspeed,
//         timestamp : req.body.timestamp,
//     })
    
//     windspeedreadings.save().then((windspeedreadings) => {
//         console.log("Wind Speed Readings : " + windspeedreadings);
//         res.code = "200";
//         res.sendStatus(200).end();
//     },(err) =>{
//         console.log("Error in wind speed data" + err)
//         res.sendStatus(400).end();
//     })

// });

app.post('/addsensor',function(req,res){
    var sensorid = req.body.sensorid;
    var sensorname = req.body.sensorname;
    var sensortype = req.body.sensortype;
    var installation_date = req.body.installation_date;
    var sensorstatus = req.body.sensorstatus;
    var nodeid = req.body.nodeid;
    console.log("sensorid" + req.body.sensorid)

        Sensors.findOneAndUpdate(
            {sensorid: sensorid}, // find a document with that filter
            {
                $set : {
                    sensorid,
                    sensorname,
                    sensortype,
                    installation_date,
                    sensorstatus,
                    nodeid
                }
            }, // document to insert when nothing was found
            {upsert: true, new: true, runValidators: true}, // options
            function (err, doc) { // callback
                if (err) {
                    // handle error
                    console.log(err);
                    res.code = "200";
                    res.sendStatus(400).end();
                } else {
                // handle document
                console.log("Sensor node updated " + doc);
                res.code = "200";
                res.body = doc;
                res.status(200).send(doc);
                }
            });
});


//Delete sensor
app.delete('/deletesensor/:SensorID', function(req,res){
    console.log("Inside Delete" + req.params.SensorID);  
   
    Sensors.findOneAndDelete({
        sensorid : req.params.SensorID
    }, function (err, result) {

        if (err) {
            console.log("error in deleting");
            res.sendStatus(400).end();

        } else {
            console.log(result);
            res.sendStatus(200).end();

        }

    });
    });

// development only
// if ('development' == app.get('env')) {
//     app.use(express.errorHandler());
//   }
  
  app.get('/', routes.index);
  app.get('/users', user.list);
  
  app.get('/kaipn',function(req,res){
    res.status(200).send({"Msg":"Ek tari API jamla"});
  });
  
  app.get('/getAll',function(req,res){
    mongo.connect(mongoURL,function(){
      var coll = mongo.collection('clusterNode');
      var obj={};
      coll.find({}).toArray(function(err, result) {
          if(err){
            res.status(400).send({});
          }
          obj["clusterNode"]=result;
          coll= mongo.collection('smartNode');
          coll.find({}).toArray(function(err1, result1) {
              if(err1){
                res.status(400).send({});
              }
              obj["smartNode"]=result1;
              coll=mongo.collection('sensorNode');
              coll.find({}).toArray(function(err2, result2) {
                  if(err2){
                    res.status(400).send({});
                  }
                  obj["sensorNode"]=result2;
                  res.status(200).send(obj);
              });
            });
        });
      });
  });
  //sensorNode
  
  app.post('/add/sensorNode',function(req,res){
    mongo.connect(mongoURL, function () {
                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('sensorNode');
                var id=1;
                var latitude="";
                var longitude="";
                var numOfNodes="";
                var withinCluster="";
                var commNode="";
                var type="";
                var status="";
                var now=new Date();
                var dateStr=dateFormat(now, "fullDate").split(",").join("");
                dateStr=dateStr+" "+dateFormat("longTime");
                console.log(dateStr);
                var timestamp=dateStr;
                timestamp=dateFormat(now, "fullDate");
  
                if(req.body){
                  if(req.body.latitude){
                    latitude=req.body.latitude;
                  }
  
                  if(req.body.longitude){
                    longitude=req.body.longitude;
                  }
  
                  if(req.body.numOfNodes){
                    numOfNodes=req.body.numOfNodes;
                  }
  
                  if(req.body.status){
                    status=req.body.status;
                  }
  
                  if(req.body.withinCluster){
                    withinCluster=req.body.withinCluster;
                  }
  
                  if(req.body.commNode){
                    commNode=req.body.commNode;
                  }
  
                  if(req.body.type){
                    type=req.body.type;
                  }
                }
                coll.find({}).toArray(function(err, result) {
                    if (err){
                      res.status(400).send({"message":"Problem with DB read operation"});
                    }
  
                    if(result.length){
                      var max=1;
                      for(var i=0;i<result.length;i++){
                        if(parseInt(result[i]["id"]) && parseInt(result[i]["id"])>max){
                            max=result[i]["id"];
                        }
                      }
                      id=max+1;
  
                    }
  
  
  
                    console.log(timestamp);
                    coll.insertOne({"id":id,"timestamp":timestamp,updatedTimestamp:timestamp,"type":type,"status":status,"latitude":latitude,"longitude":longitude,"withinSmartNode":commNode,"withinCluster":withinCluster},function(err,result){
                      if(err){
                        res.status(400).send({"message":"Problem with DB read operation"});
                      }
                      else{
                        res.status(200).send({"message":"Cluster Node Successfully Added","1":result});
                      }
                      });
                });
  
  
  
              });
  });
  
  
  app.post('/delete/sensorNode',function(req,res){
    mongo.connect(mongoURL,function(){
      var coll=mongo.collection('sensorNode');
      var id=parseInt(req.body.id);
      coll.remove({"id":id},function(err,result){
        if(err){
          res.status(400).send({"message":"Problem with executing delete operation on the database"});
        }
        res.status(200).send({"message":"Successfully deleted sensor node","result":result});
      });
    });
  });
  
  app.post('/update/sensorNode',function(req,res){
    var t="";
    mongo.connect(mongoURL,function(){
      var coll = mongo.collection('sensorNode');
      var obj={};
      coll.find({id:parseInt(req.body.id)}).toArray(function(err, result) {
          if(err){
            res.status(400).send({});
          }
          t=result[0]["timestamp"];
          var coll1=mongo.collection('sensorNode');
          var id=req.body.id;
          var status=req.body.status;
          var latitude=req.body.latitude;
          var longitude=req.body.longitude;
          var now=new Date();
          var dateStr=dateFormat(now, "fullDate").split(",").join("");
          dateStr=dateStr+" "+dateFormat("longTime");
          console.log(dateStr);
          var timestamp=dateStr;
          timestamp=dateFormat(now, "fullDate");
          var type=req.body.type;
          var withinCluster=req.body.withinCluster;
          var commNode=req.body.commNode;
          coll1.updateOne({"id":parseInt(id)},{"id":parseInt(id),"timestamp":t,"updatedTimestamp":timestamp,"type":type,"status":status,"latitude":latitude,"longitude":longitude,"withinSmartNode":commNode,"withinCluster":withinCluster}, function(err1, result1) {
          if (err1){
            res.status(400).send({"message":"Problem with executing delete operation on the database"});
          }
          res.status(200).send({"message":"Successfully updated","result":result1});
          });
      //  })
        });
      });
  
  
    //mongo.connect(mongoURL,function(){
  
  });
  
  //smartNode
  
  app.post('/add/smartNode',function(req,res){
    mongo.connect(mongoURL, function () {
                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('smartNode');
                var id=1;
                var latitude="";
                var longitude="";
                var numOfNodes="";
                var commNode="";
                var now=new Date();
                var dateStr=dateFormat(now, "fullDate").split(",").join("");
                dateStr=dateStr+" "+dateFormat("longTime");
                console.log(dateStr);
                var timestamp=dateStr;
                timestamp=dateFormat(now, "fullDate");
                var withinCluster="";
                var status="";
                if(req.body){
                  if(req.body.latitude){
                    latitude=req.body.latitude;
                  }
  
                  if(req.body.longitude){
                    longitude=req.body.longitude;
                  }
  
                  if(req.body.status){
                    status=req.body.status;
                  }
  
                  if(req.body.numOfNodes){
                    numOfNodes=req.body.numOfNodes;
                  }
  
                  if(req.body.commNode){
                    commNode=req.body.commNode;
                  }
  
                  if(req.body.withinCluster){
                    withinCluster=req.body.withinCluster;
                  }
                }
                coll.find({}).toArray(function(err, result) {
                    if (err){
                      res.status(400).send({"message":"Problem with DB read operation"});
                    }
                    if(result.length){
                      var max=1;
                      for(var i=0;i<result.length;i++){
                        if(parseInt(result[i]["id"]) && parseInt(result[i]["id"])>max){
                            max=result[i]["id"];
                        }
                      }
                      id=max+1;
  
                    }
                    coll.insertOne({"id":id,"latitude":latitude,"timestamp":timestamp,updatedTimestamp:timestamp,"longitude":longitude,"status":status,"commNode":commNode,"withinCluster":withinCluster},function(err,result){
                      if(err){
                        res.status(400).send({"message":"Problem with DB read operation"});
                      }
                      else{
                        res.status(200).send({"message":"Cluster Node Successfully Added","1":result});
                      }
                      });
                });
  
  
  
              });
  });
  
  app.post('/delete/smartNode',function(req,res){
    mongo.connect(mongoURL,function(){
      var coll=mongo.collection('smartNode');
      var id=parseInt(req.body.id);
      coll.remove({"id":id},function(err,result){
        if(err){
          res.status(400).send({"message":"Problem with executing delete operation on the database"});
        }
        res.status(200).send({"message":"Successfully deleted smart node","result":result});
      });
    });
  });
  
  
  app.post('/update/smartNode',function(req,res){
    var t="";
    mongo.connect(mongoURL,function(){
      var coll = mongo.collection('smartNode');
      var obj={};
  
      coll.find({id:parseInt(req.body.id)}).toArray(function(err, result) {
          if(err){
            res.status(400).send({});
          }
          t=result[0]["timestamp"];
          console.log(req.body);
          var coll1=mongo.collection('smartNode');
          var id=req.body.id;
          var status=req.body.status;
          var latitude=req.body.latitude;
          var longitude=req.body.longitude;
          var type=req.body.type;
          var withinCluster=req.body.withinCluster;
          var commNode=req.body.commNode;
          var now=new Date();
          var dateStr=dateFormat(now, "fullDate").split(",").join("");
          dateStr=dateStr+" "+dateFormat("longTime");
          console.log(dateStr);
          var timestamp=dateStr;
          timestamp=dateFormat(now, "fullDate");
  
          coll1.updateOne({"id":parseInt(id)},{"id":parseInt(id),"latitude":latitude,"timestamp":t,"updatedTimestamp":timestamp,"longitude":longitude,"status":status,"commNode":commNode,"withinCluster":withinCluster}, function(err1, result1) {
          if (err1){
            res.status(400).send({"message":"Problem with executing delete operation on the database"});
          }
          console.log(result1);
          res.status(200).send({"message":"Successfully updated","result":result1});
          });
  
        });
    });
  
  
    //mongo.connect(mongoURL,function(){
  
  //  })
  });
  
  
  
  //clusterNode
  
  app.post('/update/clusterNode',function(req,res){
    var t="";
    mongo.connect(mongoURL,function(){
      var coll = mongo.collection('clusterNode');
      var obj={};
  
      coll.find({id:parseInt(req.body.id)}).toArray(function(err, result) {
          if(err){
            res.status(400).send({});
          }
          console.log("get result:"+result);
          t=result[0]["timestamp"];
  
  
          var coll1=mongo.collection('clusterNode');
          var id=req.body.id;
          var status=req.body.status;
          var latitude=req.body.latitude;
          var longitude=req.body.longitude;
          var now=new Date();
          var dateStr=dateFormat(now, "fullDate").split(",").join("");
          dateStr=dateStr+" "+dateFormat("longTime");
          console.log(dateStr);
          var timestamp=dateStr;
          timestamp=dateFormat(now, "fullDate");
  
          var numOfNodes=req.body.commNode;
  
          coll1.updateOne({"id":parseInt(id)},{"id":parseInt(id),"timestamp":t,"updatedTimestamp":timestamp,"status":status,"latitude":latitude,"longitude":longitude,"communicatingNodes":numOfNodes}, function(err1, result1) {
          if (err1){
            res.status(400).send({"message":"Problem with executing delete operation on the database"});
          }
          res.status(200).send({"message":"Successfully updated","result":result});
          });
        });
  
  
  
  
      });
  
    //mongo.connect(mongoURL,function(){
  
  //  })
  });
  
  app.post('/delete/clusterNode',function(req,res){
    mongo.connect(mongoURL,function(){
      var coll=mongo.collection('clusterNode');
      var id=parseInt(req.body.id);
      coll.remove({"id":id},function(err,result){
        if(err){
          res.status(400).send({"message":"Problem with executing delete operation on the database"});
        }
        res.status(200).send({"message":"Successfully deleted cluster node","result":result});
      });
  });
  
  
  
  });
  
  app.post('/add/clusterNode',function(req,res){
    mongo.connect(mongoURL, function () {
                console.log('Connected to mongo at: ' + mongoURL);
                var coll = mongo.collection('clusterNode');
                var id=1;
                var latitude="";
                var longitude="";
                var numOfNodes="";
                var now=new Date();
                var dateStr=dateFormat(now, "fullDate").split(",").join("");
                dateStr=dateStr+" "+dateFormat("longTime");
                console.log(dateStr);
                var timestamp=dateStr;
                timestamp=dateFormat(now, "fullDate");
  
                var status="";
                if(req.body){
                  if(req.body.latitude){
                    latitude=req.body.latitude;
                  }
  
                  if(req.body.status){
                    status=req.body.status;
                  }
  
  
                  if(req.body.longitude){
                    longitude=req.body.longitude;
                  }
  
                  if(req.body.commNode){
                    numOfNodes=req.body.commNode;
                  }
                }
                coll.find({}).toArray(function(err, result) {
                    if (err){
                      res.status(400).send({"message":"Problem with DB read operation"});
                    }
                    if(result.length){
                      var max=1;
                      for(var i=0;i<result.length;i++){
                        if(parseInt(result[i]["id"]) && parseInt(result[i]["id"])>max){
                            max=result[i]["id"];
                        }
                      }
                      id=max+1;
  
                    }
                    coll.insertOne({"id":id,"timestamp":timestamp,updatedTimestamp:timestamp,"status":status,"latitude":latitude,"longitude":longitude,"communicatingNodes":numOfNodes},function(err,result){
                      if(err){
                        res.status(400).send({"message":"Problem with DB read operation"});
                      }
                      else{
                        res.status(200).send({"message":"Cluster Node Successfully Added","1":result});
                      }
                      });
                });
  
  
  
              });
  });
  
  

app.use("/sensor", sensorRoute);

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");