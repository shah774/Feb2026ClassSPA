// "Import" the Express module instead of http
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

const PORT = process.env.PORT || 3000;
// Initialize the Express application
const app = express();
const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${new Date().toLocaleString("en-us")}`);
  next();
};
app.use(cors());
app.use(express.json)
app.use(logging);

mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Successfully opened connection to Mongo!");
});

// Handle the request with HTTP GET method from http://localhost:3000/status
app.get("/status", (request, response) => {
   // Create the headers for response by default 200
   // Create the response body
   // End and return the response
  response.json({ message: "Service healthy" });
});
// http://localhost:3000/echo/mumtaz?flip=1&lastName=Shah
app.get("/echo/:text", (request, response) => {
    const output = request.params.text
    if ('flip' in request.query && request.query.flip === 'true') {
        output = output.split("").reverse().join("");
    }
    if ('lastName' in request.query) {
        output += ` ${request.query.lastName}`;
    }
   response.status(418).send(`You told me to echo ${output}`);
})

// Tell the Express app to start listening
// Let the humans know I am running and listening on 3000
const server = app.listen(PORT, () => console.log(`Listening on port ${server.address().port}`));