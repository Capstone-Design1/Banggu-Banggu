module.exports = function(app){//함수로 만들어 객체 app을 전달받음
    const express = require('express');
    const router = express.Router();
    const path = require('path');
    const pg = require('pg');

    const fs = require('fs');
    const bangguPath = '/../view/';
    const Vue = require('vue');

    const renderer_one = require('vue-server-renderer').createRenderer();
    const renderer_two = require('vue-server-renderer').createRenderer();

    console.log("new Connection!");


    // include components
    const browse_component = require('./browse_component.js');
    const list_facilities_component = require('./detail_component.js');

    /* postgres DB Setting */
    const pool = new pg.Pool({
        user: 'admin',
        host: '127.0.0.1',
        database: 'bangdb',
        password: '123123',
        port: '5432'
    });
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
    router.get('/', function (req, response) {
        client.query("SELECT name, score, floor_plan FROM facility INNER JOIN  estimation ON facility.name = estimation.room_name;")
            .then(res => {
                var rooms = res.rows;

                const vueApp = new Vue({
                    components: {
                        'browse-room-component': browse_component.browseRoomComponent
                    },
                    data: {
                        rooms: res.rows
                    },
                    template: fs.readFileSync('./view/browse.template.html', 'utf-8')
                });

                renderer_one.renderToString(vueApp, (err, html) => {
                    if (err) {
                        return response.status(500).end('Internal Server Error');
                    }
                    response.end(`
                            <!DOCTYPE html>
                            <html lang="en">
                            <head><title></title></head>
                            <body>${html}</body>
                            </html>
                            `);
                }); /* renderer end */
            }); /* client query end */
    })

    router.get('/:roomName', function(req, response) {
        var roomName = req.params.roomName;
        console.log(roomName);
        client.query("SELECT * FROM facility INNER JOIN  estimation ON facility.name = estimation.room_name WHERE facility.name = '"+ roomName +"'")
            .then(res => {
                var info = res.rows[0];
                info['roomName'] = roomName;
                console.log(res.rows);
                info['img'] = [
                    "glyphicons/glyphicons-22-snowflake.png", // air conditioner
                    "glyphicons/glyphicons-564-person-wheelchair.png", // easy access
                    "glyphicons/glyphicons-266-electrical-plug.png", // plug
                    "glyphicons/glyphicons-74-wifi.png", // wifi
                    "glyphicons/glyphicons-232-sun.png", // window
                    "glyphicons/glyphicons-214-arrow-up.png", // elevator
                    "glyphicons/glyphicons-87-display.png", // computer
                    "glyphicons/glyphicons-170-record.png" // projector
                ];
                info['fac_name'] =  [
                    "에어컨",
                    "접근성 우수",
                    "플러그",
                    "wifi",
                    "창문",
                    "엘레베이터",
                    "컴퓨터",
                    "프로젝터"
                ];
                var temp = [], facility = info['facilities'];
                var chunkSize = 2;
                for (var i = 0; i < info['facilities'].length; i+= chunkSize){
                    temp.push(facility.slice(i,i+chunkSize));
                }
                info['facilities'] = temp;


                const vueApp2 = new Vue({
                    components: {
                        'li-facility-component': list_facilities_component.component
                    },
                    data : info,
                    template: fs.readFileSync('./view/detail.template.html', 'utf-8')
                });

                renderer_two.renderToString(vueApp2, (err, html) => {
                    if (err) {
                        console.log(err);
                        return response.status(500).end('Internal Server Error');
                    }
                    response.end(`
                            <!DOCTYPE html>
                            <html lang="en">
                            <head><title></title></head>
                            <body>${html}</body>
                            </html>
                            `);
                }); /* renderer end */
            }); /* client query end */
    });

    return router;  //라우터를 리턴
};
