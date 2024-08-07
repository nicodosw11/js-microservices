// Loads the Express library for use in our code
const express = require('express');
// Loads the (built-in) fs library so we can use the Node.js file system API
const fs = require('fs');

// Creates an instance of the Express library (an Express application)
const app = express();

// Throws an error that tells us when the required environment variable isn’t supplied
if (!process.env.PORT) {
  throw new Error('You must set the PORT environment variable');
}

// Copies the environment variable to a global variable for easy access
// This is the port that our HTTP server will listen on
const PORT = process.env.PORT;

// Creates a route handler for the main HTTP Get route
// The handler prints Hello World! in the web browser
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Sets the HTTP GET route handler for streaming video.
// The use of the async keyword marks the route handler as an asynchronous function.
// Async routes handlers are new in Express v5.
app.get('/video', async (req, res) => {
  // The path to the video file
  // The video is loaded from the videos subdirectory.
  const videoPath = './videos/SampleVideo_1280x720_1mb.mp4';
  // Retrieves the video file size. We’ll encode this in the HTTPdd
  // Note that we’re using "fs.promises" instead of "fs" to  gain access to filesystem functions that are compatible with JavaScript's async/await keywords.
  const stats = await fs.promises.stat(videoPath);

  // Sends a response header to the web browser, including the content length and mime type
  res.writeHead(200, {
    'Content-Length': stats.size,
    'Content-Type': 'video/mp4',
  });
  //Streams the video to the web browser.
  fs.createReadStream(videoPath).pipe(res);
})

// Starts the HTTP server using the port number that was input to the microservice
app.listen(PORT);
