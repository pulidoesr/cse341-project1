const express = require('express');
const app = express();
const path = require('path');
const { initDb} = require('./models/connect');



// Serve the frontend folder
app.use(express.static(path.join(__dirname, './week01')));

const port = 8080;

initDb((err, db) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected successfully');

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
});


