const express = require('express');
const app = express();

// set routers
// base path: "./route"
// Result Path : base path + routeName + ".js"
// example : "./route" + "/home" + ".js" => ./route/home.js
const routes = ["/browse"];
for (var routeName in routes) {
    var router = require("./route" + routeName + ".js")(app);
    // mount the router on the app
    app.use(routeName, router);
}

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(8000, () => console.log('Example app listening on port 8000!'))
