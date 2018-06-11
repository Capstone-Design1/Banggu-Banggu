const express = require('express');
const app = express();
const path = require("path");

const port = 8000;

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.static(__dirname + '/view'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/view/home.html')));

app.get('/about', (req, res) => res.sendFile(path.join(__dirname + '/view/about.html')));


// set routers
// base path: "./route"
// Result Path : base path + routeName + ".js"
// example : "./route" + "/home" + ".js" => ./route/home.js
const routes = ["/api", "/browse"];
for (var idx in routes) {
    var router = require('./route' + routes[idx] + '.js')(app);

    // mount the router on the app => route = URL:[port]/{routes[idx]}/...
    app.use(routes[idx], router);
}

app.listen(port, () => console.log('Example app listening on port 8000!'));
