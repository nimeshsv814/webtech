var http = require("http");
var fs = require("fs");
var url = require("url");
var databaseUrl = "mongodb://127.0.0.1:27017/mydb";
var mongojs = require("./node_modules/mongojs");
var db = mongojs(databaseUrl);
console.log("Connected to MongoDB");

exports.authenticateUser = function (name, password, response) {
  db.users.find(
    {
      username: name,
      password: password,
    },
    function (err, users) {
      if (err || !users) {
        response.write("Not authorized user");
        response.end();
      } else if (users.length == 0) {
        response.write("Not authorized user");
        response.end();
      } else {
        response.write("authorized user");
        response.end();
      }
    }
  );
};

exports.saveUser = function (name, email, phno, password, password1, response) {
  console.log("Saving user to mongo");
  db.users.insert(
    {
      username: name,
      email: email,
      phno: phno,
      password: password,
      Confirmpassword: password1,
    },
    function (err, saved) {
      if (err || !saved) console.log(err);
      else response.write("User Saved");
      response.end();
    }
  );
};
