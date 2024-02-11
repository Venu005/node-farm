const { error } = require("console");
const fs = require("fs");
//import * as fs from "node:fs";
//
const http = require("http");
const url = require("url");
//////////// fs-- read , write, aappend file --async way
// fs.readFile("txt/input.txt", "utf8", (err, data) => {
//   if (err) {
//     return console.log("Error");
//   } else {
//     console.log(data);
//   }
//   //console.log(data);
// });
// // completely  rewrite the file
// // fs.writeFile(`txt/input.txt`, "this is a new text", "utf-8", (err) => {
// //   if (err) {
// //     throw new Error("Error");
// //   }
// // });
// // append to the file
// fs.appendFile("txt/input.txt", "appended file", "utf-8", (err) => {
//   if (err) {
//     throw new Error();
//   }
// });
// // writeFile creates the file if it does not exist
// fs.writeFile(
//   "test.txt",
//   "this is to check if the file is created automatically for writeFile and yes it does",
//   "utf-8",
//   (err) => {
//     if (err) {
//       throw new Error();
//     }
//   }
// );
//skipping callback hell, cause I know I can use async, await or promises 🌚🌚

///SERVER
// create a server
const server = http.createServer((req, res) => {
  console.log(req.url); // reading the url
  const pathname = req.url;

  //routing
  if (pathname === "/" || pathname === "/overview") {
    res.end("This is the overview");
  } else if (pathname === "/product") {
    res.end("This is the product page");
  } else {
    res.writeHead(404, {
      // this is a header
      "Content-type": "text/html",
    });
    res.end(`<h1>sorry babe, this page does not exist ${res.statusCode} </h1>`);
  }
  // res.end("Hello from the server");
});
// start a server
server.listen(8000, "localhost", () => {
  console.log("Server is listening on port 8000");
});
