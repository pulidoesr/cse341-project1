
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { initDb } = require('./models/connect'); 
const contactsRoute = require('./routes/contactsRoute');
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");
const swaggerDocument = require('./swagger-output.json');
const bodyParser = require('body-parser');


// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Middleware to serve frontend static files
app.use(express.static(path.join(__dirname, './cse341-project1')));
app.use(express.json());

// Use routes
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
  });


app.use('/', contactsRoute); 

const port = 8080;

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`)
});

// Initialize the database before starting the server
initDb()
  .then(() => {
    console.log('Database connected successfully');

    app.listen(port, () => {
      console.log(`Server is running on https://cse341-project1-d10a.onrender.com/:${port}`);
      console.log(`Swagger Docs available at https://cse341-project1-d10a.onrender.com/:${port}/api-docs`)
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
