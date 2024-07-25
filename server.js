const express = require("express");
const app = express();

// Enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by freeCodeCamp
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// Root endpoint
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Endpoint to handle empty date parameter
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({ unix: now.getTime(), utc: now.toUTCString() });
});

// Endpoint to handle date parameter
app.get("/api/:date", (req, res) => {
  const dateParam = req.params.date;

  // Check if the date parameter is a valid number (unix timestamp)
  const timestamp = parseInt(dateParam);

  let date;
  if (!isNaN(timestamp)) {
    // If it's a valid number, create a date from the timestamp
    date = new Date(timestamp);
  } else {
    // Otherwise, try to create a date from the string
    date = new Date(dateParam);
  }

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// Listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
