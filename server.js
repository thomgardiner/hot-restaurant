const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

let app = express();
let PORT = process.env.PORT || 3000;

let tables = require('./tables.js');
let waitingList = require('./waitinglist.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });

app.get("/reservations", function(req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
  });

app.get("/tablestest", function(req, res) {
    console.log("Tried to pull table object");
    return res.json(tables);
});

app.get("/waitinglist", function(req, res) {
    console.log("Tried to pull waitlist object");
    return res.json(waitingList);
});


app.post("/tablespost", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body-parser middleware
        var newRes = req.body;

        if(tables.length < 5){
            tables.push(newRes);
            console.log(newRes);
            console.log("You are booked!");
            alert('Booked!');
        }
        else{
            waitingList.push(newRes);
            console.log("We are fully booked! You are now on the waiting list!");
        }

      });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
