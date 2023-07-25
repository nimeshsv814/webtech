var module = require("./dbmodule");
var url = require("url");
var querystring = require("querystring");
var http = require("http");

http
  .createServer(function (request, response) {
    var data1 = "";

    request.on("data", function (chunk) {
      data1 += chunk;
    });

    request.on("end", function () {
      var name = querystring.parse(data1)["name"];
      console.log(name);
      var email = querystring.parse(data1)["email"];
      console.log(email);
      var phno = querystring.parse(data1)["phno"];
      console.log(phno);
      var password = querystring.parse(data1)["password"];
      console.log(password);
      var password1 = querystring.parse(data1)["password1"];
      console.log(password1);

      if (request.url === "/login") {
        module.authenticateUser(name, password, response);
      } else if (request.url === "/save") {
        module.saveUser(name, email, phno, password, password1, response);
      }
    });
  })
  .listen(3000);
console.log("Server started");
