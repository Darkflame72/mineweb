const express = require("express");
const app = express();

app.use(express.static(__dirname));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

const listener = app.listen(8080, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// This just sends index.js