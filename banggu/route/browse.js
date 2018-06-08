module.exports = function(app) { //함수로 만들어 객체 app을 전달받음
    const express = require('express');
    const router = express.Router();
    const path = require('path');
    const pg = require('pg');

    const fs = require('fs');
    const Vue = require('vue');

    const renderer_one = require('vue-server-renderer').createRenderer();
    const renderer_two = require('vue-server-renderer').createRenderer();

    console.log("new Connection!");


    // include components
    const browse_component = require('./browse_component.js');
    const list_facilities_component = require('./detail_component.js');

    /* postgres DB Setting *//*
                                const pool = new pg.Pool({
                                user: 'admin',
                                host: '127.0.0.1',
                                database: 'bangdb',
                                password: '123123',
                                port: '5432'
                                });*/
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
    router.get('/', function (request, response) {
        var display_query = " where is_person_in = false ";
        if ('display_all' in request.query == true && request.query['display_all'] == 'true')
            display_query = '';

        client.query("SELECT name, score, floor_plan FROM facility" + display_query + " order by score DESC;")
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
        client.query("select * from facility fa inner join (select * from environment where room_name='" + roomName + "' order by intime DESC limit 1) env on env.room_name = fa.name;")
            .then(res => {
                var info = {
                    room_info: res.rows[0],
                    discomfort: '2.5',
                };
                info['roomName'] = roomName;
                console.log(res.rows);
                info['img'] = [
                    "glyphicons/glyphicons-266-electrical-plug.png", // plug
                    "glyphicons/glyphicons-139-picture.png", // window
                    "glyphicons/table.png",//sepTable
                    "glyphicons/glyphicons-22-snowflake.png", // air conditioner
                    "glyphicons/glyphicons-170-record.png", // projector
                    "glyphicons/glyphicons-691-laptop.png", // computer
                    "glyphicons/board.png", //wBoard
                    "glyphicons/glyphicons-74-wifi.png", // wifi
                ];
                info['fac_name'] =  [
                    "플러그",
                    "창문",
                    "분리형 책상",
                    "개별 에어컨",
                    "프로젝터",
                    "컴퓨터",
                    "화이트 보드",
                    "wifi"
                ];
                var temp = [], facility = info['room_info']['facilities'];
                var chunkSize = 2;
                for (var i = 0; i < facility.length; i+= chunkSize){
                    temp.push(facility.slice(i,i+chunkSize));
                }
                info['facilities'] = temp;


                const vueApp2 = new Vue({
                    components: {
                        'li-facility-component': list_facilities_component.component,
                        'li-environment-component': list_facilities_component.env_component
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
