const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// const request = require("request");
// const https = require("https");

const app = express();

const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
});

// for the form
app.post("/", function (req, res) {
  const item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/Work");
  } else {
    items.push(item);
    res.redirect("/");
    // console.log(req.body);
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

// former if statements replaced by switch as they got much
//     switch (currentDay) {
//         case 0:
//             day = "Sunday";
//             break;
//         case 1:
//             day = "Monday";
//             break;
//         case 2:
//             day = "Tuesday";
//             break;
//         case 3:
//             day = "Wednesday";
//             break;
//         case 4:
//             day = "Thursday";
//             break;
//         case 5:
//             day = "Friday";
//             break;
//         case 6:
//             day = "Saturday";
//             break;
//         default:
//             break;
//             console.log("Error: current day is equal to: " + currentDay);
//     }

// replaced by switch statements
// var currentDay = today.getDay();
//     var day = "";
// if (currentDay === 6 || currentDay === 0) {
//         day = "Weekend";
//         // res.send("<h1>Yay! Its the weekend!</h1>");
//     } else {
//         // res.send("<h1>Boo! I have to work!</h1>");
//         // res.sendFile(__dirname + "/index.html");
//         day = "Weekday";
//     }
