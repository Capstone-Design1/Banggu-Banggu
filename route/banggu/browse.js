module.exports = function(app){//함수로 만들어 객체 app을 전달받음
    const express = require('express');
    const router = express.Router();
    const path = require('path');

    const bangguPath = '/../../view/banggu/'

    router.get('/', function(req, res){
        res.sendFile(path.join(__dirname + bangguPath + 'browse.html'));
    });

    router.get('/detail', function(req, res){
        res.sendFile(path.join(__dirname + bangguPath + 'detail.html'));
    });
    return router;  //라우터를 리턴
};
