const express = require('express');
const app = express();
const path = require("path");

const port = 8000;

app.use(express.static(__dirname + '/view'));
// app.get(['/', '/home'], (req, res) => res.sendFile(path.join(__dirname + '/view/bangguhome.html')));


// set routers
// base path: "./route"
// Result Path : base path + routeName + ".js"
// example : "./route" + "/home" + ".js" => ./route/home.js
const routes = ["/banggu", "/banggu/browse"];
for (var idx in routes) {
    var router = require('./route' + routes[idx] + '.js')(app);

    // mount the router on the app => route = URL:[port]/{routes[idx]}/...
    app.use(routes[idx], router);
}

app.listen(port, () => console.log('Example app listening on port 8000!'));
