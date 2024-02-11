const fs = require("fs");
//import * as fs from "node:fs";

const http = require("http");
const url = require("url");
const sulgify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, (err, data) => {
  if (err) {
    console.log(err);
  }
});
const productData = JSON.parse(data);
const slugs = productData.map((el) => sulgify(el.productName, { lower: true }));

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

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
  const pathName = req.url;
  console.log(url.parse(pathName, true));
  const { query, pathname } = url.parse(pathName, true);

  //routing
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHTML = productData
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const ouput = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHTML);
    res.end(ouput);
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = productData[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    // const productData =  JSON.parse(data);
    res.end(data);
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
