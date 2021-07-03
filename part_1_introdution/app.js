l3;
global.setTimeout(() => {
  console.log("timeoit");
}, 3000);
setTimeout(() => {
  console.log("timeoit");
}, 3000);
console.log(__dirname);
console.log(__filename);

l4;
const { users, nums } = require("./users.js");
console.log(nums);

l5;
const fs = require("fs");

fs.readFile("node.txt", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data.toString());
  }
});

fs.writeFile("mobile/node.txt", "New message", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("New message created");
  }
});

fs.appendFile("mobile/node.txt", "Another new message\r\n", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Another new message created");
  }
});

if (!fs.existsSync("newfolder")) {
  fs.mkdir("newfolder", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("New folder created");
    }
  });
} else {
  console.log("A folder already exists");
}

if (fs.existsSync("newfolder")) {
  fs.rmdir("newfolder", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("The folder deleted");
    }
  });
} else {
  console.log("The folder already deleted");
}

if (fs.existsSync("mobile/node.txt")) {
  fs.unlink("mobile/node.txt", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("The file deleted");
    }
  });
} else {
  console.log("The file already deleted");
}

l6;
const readStream = fs.createReadStream("largetext.txt", { encoding: "utf-8" });
const writeStream = fs.createWriteStream("writeStream.txt");
readStream.on("data", (chunk) => {
  console.log("###  new chunk ###");
  console.log(chunk);
  writeStream.write("\n ### new streame ### \n");
  writeStream.write(chunk);
});

readStream.pipe(writeStream);
