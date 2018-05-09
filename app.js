const express = require('express');
const app = express();
const path = require("path");

const port = 8000;

// set routers
// base path: "./route"
// Result Path : base path + routeName + ".js"
// example : "./route" + "/home" + ".js" => ./route/home.js
const routes = ["/template"];
for (var idx in routes) {
    var router = require('./route' + routes[idx] + '.js')(app);

    // mount the router on the app
    app.use(routes[idx], router);
}

// app.get('/', (req, res) => res.send('Hello World!'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/view/menu.html')));

app.listen(port, () => console.log('Example app listening on port 8000!'))
