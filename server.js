const express = require('express');
const app = express();
const path = require('path');
const { initDb } = require('./models/connect'); 
const contactsRoute = require('./routes/contactsRoute');


// Middleware to serve frontend static files
app.use(express.static(path.join(__dirname, './cse341-project1')));

// Use routes
app.use('/', contactsRoute); 

const port = 8080;

// Initialize the database before starting the server
initDb()
  .then(() => {
    console.log('Database connected successfully');

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
