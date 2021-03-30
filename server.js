let projectData = {};
// Require Express to run server and routes
const express = require('express');

// Dependencies
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
//app.use(bodyParser.json());// body parser is deprecated
//app.use(bodyParser.urlencoded({extended:true})); //body parser is deprecated
//use express.json and express.urlencoded instead of body parser.json and body parser.urlencoded because of using express >=4.16.0 body parser re-added under it
app.use(express.json());
app.use(express.urlencoded({extended:false})); 

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const port = 8080;
const server = app.listen(port, lis);

function lis() {
    console.log(`running on local host :${port}`);
}
// Get route
app.get('/all', function (req, res) {
    res.send(projectData);
});

//post route
app.post('/add', function (req, res) {
    console.log(req.body);
    projectData['Temperature'] = req.body.Temperature,
       projectData['Date'] = req.body.Date,
       projectData['userResponse'] = req.body.userResponse;
      
        
})


