const fs = require("fs");
//import * as fs from "node:fs";
//
console.log(hello);
fs.readFile("txt/input.txt", "utf8", (err, data) => {
  if (err) {
    return console.log("Error");
  } else {
    console.log(data);
  }
  //console.log(data);
});
// completely  rewrite the file
// fs.writeFile(`txt/input.txt`, "this is a new text", "utf-8", (err) => {
//   if (err) {
//     throw new Error("Error");
//   }
// });
// append to the file
fs.appendFile('txt/input.txt', 'appended file', 'utf-8', (err)=>{
    if(err){
        throw new Error;
    }
})