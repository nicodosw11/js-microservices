// Loads the Express library for use in our code 
const express = require('express');

// Creates an instance of the Express library (an Express application)
const app = express();

// Our HTTP server will listen on port 3000
const port = 3000;

// Creates a route handler for the main HTTP Get route
// The handler prints Hello World! in the web browser
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Initiates the HTTP server
app.listen(port);
