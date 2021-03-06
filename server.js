const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// Required variables for routing API
require("./api/routeAPI")(app);