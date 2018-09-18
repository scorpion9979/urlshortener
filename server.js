'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const dns = require('dns');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect("mongodb://scorpion9979:ahmedFcc221@ds161092.mlab.com:61092/urlshortener");

app.use(cors());

/** this project needs to parse POST bodies **/
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

var Schema = mongoose.Schema;
var urlSchema = new Schema({
  original_url: {type: String, required: true},
  short_url: {type: String, required: true}
});
var countSchema = new Schema({
  urlCount: {type: Number, required: true}
});
var Model = mongoose.model("Model", urlSchema);
var Count = mongoose.model("Count", countSchema);

app.post("/api/shorturl/new", function (req, res) {
  let url = req.body.url.replace(/^(\w+:\/\/)/, "").replace(/(\/\w+\/?)+$/, "");
  dns.lookup(url, function (err, address, family) {
    if(err) {
      res.send({"error":"invalid URL"});
    } else {
      res.send({"original_url":url,"short_url":1});
    }
  })
});

var listener = app.listen(port, function () {
  console.log('Node.js listening on port: ' + listener.address().port);
});