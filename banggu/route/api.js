module.exports = function(app) { //함수로 만들어 객체 app을 전달받음
    const express = require('express');
    const router = express.Router();
    const path = require('path');
    const pg = require('pg');

    const fs = require('fs');

    const client = new pg.Client({
        user: 'admin',
        host: '127.0.0.1',
        database: 'bangdb',
        password: '123123',
        port: '5432'
    });

    client.connect((err, client, done) => {
        if (err) {
            console.log(err);
            return res.status(500).json({success: false, data: err, client1: client});
        }
    });
    router.get('/K/5', function (request, response) {
        var k5jeojson = require("../../k5.json");

        client.query("select * from facility fa inner join (select * from environment where room_name='K501' order by intime DESC limit 1) env on env.room_name = fa.name;")
            .then(res => {
                var info = res.rows[0];

                k5jeojson.features[0].properties.evaluation = info.score;
                k5jeojson.features[0].properties.temperature = info.temp;
                k5jeojson.features[0].properties.humidity = info.humidity;
                k5jeojson.features[0].properties.co2 = info.co2;
                k5jeojson.features[0].properties.dust = info.dust;

                console.log(info);
                console.log(k5jeojson);
                response.send(k5jeojson);
            });
    });

    router.get('/room/:roomName', function (request, response) {
        client.query("SELECT * FROM environment")
            .then(res => {
                response.send(res.rows);
            });
    });

    var rooms = {};

    router.post('/room/:roomName/temp/:temp/humidity/:humidity/co2/:co2/dust/:dust', function (req, response) {
        var roomName = req.params.roomName;
        if ((roomName in rooms) == false) {
            rooms[roomName] = {
                temp: null,
                humidity: null,
                co2: null,
                dust: null
            }
        }

        for (var val in req.params) {
            if (req.params[val] != "null") {
                rooms[roomName][val] = req.params[val];
            }
        }

        var query_ok = true;
        for (var val in rooms[roomName]) {
            if (rooms[roomName][val] == null) {
                query_ok = false;
                break;
            }
        }

        if (query_ok == true) {
            client.query("INSERT INTO environment (room_name, intime, temp, humidity, co2, dust)"
                    + "VALUES ("
                    + "'"   + roomName + "'"
                    + ", now() at time zone 'Asia/Seoul'"
                    + ", "  + rooms[roomName].temp
                    + ", "  + rooms[roomName].humidity
                    + ", "  + rooms[roomName].co2
                    + ", "  + rooms[roomName].dust
                    + ");" )
                .then(res => {
                    console.log("Data Insertion success");
                    console.log(rooms[roomName]);
                }); /* client query end */
        }

        response.send(query_ok);
    })

    return router;
};
