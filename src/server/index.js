require("dotenv").config({ path: ".env" });
const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

async function getMarsPhotos() {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`
    );
    return response.data.rovers;
  } catch (error) {
    console.log("Error fetching rover data:", error);
    return [];
  }
}

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.get("/mars-photo", async (req, res) => {
  try {
    const rovers = await getMarsPhotos();
    res.json(rovers);
  } catch (error) {
    console.log("Error rendering dashboard:", error);
    res.json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
