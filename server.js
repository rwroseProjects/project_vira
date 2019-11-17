const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var fs = require('fs');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/get_data', (req, res) => {
    res.send({ express: 'This is new data'});
});

//require('./api/getData')(app);
//This reads through each file in the API folder tree and requires that api.
fs.readdirSync(__dirname + "/api").forEach(function(file) {
    var name = "./api/" + file.substr(0, file.indexOf('.'));
    if (name == "./api/") return;
    require(name)(app);
    console.log(name);
});