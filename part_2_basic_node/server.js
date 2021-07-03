const http = require("http");
const fs = require("fs");
const moment = require("moment");
const port = 3000;
const hostname = "localhost";

const christmas = "2021-12-25";
console.log(moment(christmas).format("LL"));

const server = http.createServer((req, res) => {
  //l9
  // console.log("request url", req.url);
  // console.log("request method", req.method);
  //l10
  // res.setHeader("Content-Type", "text/html");
  // res.write('<body class="app"></body>');
  // res.write("<h3>Welcome to Node-Tutorial</h3>");
  // res.write("<p>This is NodeJS course</p>");
  // res.end();

  res.setHeader("Content-Type", "text/html");
  //   fs.readFile("./view/index.html", (err, data) => {
  //     if (err) {
  //       console.log(err);
  //       res.end();
  //     } else {
  //       // res.write(data);
  //       res.end(data);
  //     }
  //   });
  // });

  let route = "./views/";
  switch (req.url) {
    case "/":
      route += "index.html";
      res.statusCode = 200;
      break;
    case "/contact":
      route += "contact.html";
      res.statusCode = 200;
      break;
    //l14
    case "/contact-us":
      res.statusCode = 301;
      res.setHeader("Location", "/contact");
      break;
    default:
      route += "404.html";
      res.statusCode = 404;
      break;
  }
  fs.readFile(route, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // res.write(data);
      res.end(data);
    }
  });
});
//l11

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
