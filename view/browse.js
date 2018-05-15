/*
var num;
var JSON_LIST =

function browse(num, JSON_LIST){
    for(var i = 0; i <= num; i++){
        var node = document.create
    }
    
    
}
*/

/*
var xhr = new XMLHttpRequest();
xhr.onload = function {
    if(xhr.status == 200) {
        responseObject = JSON.parse(xhr.responseText);
*/

$(function(){
    var responseObject;
    $.ajax({
        beforeSend: function(xhr){
            if(xhr.overrideMimeType){
                xhr.overrideMimeType("application/json");
            }
        }
    });

    function loanRooms(){
        $.getJSON('data/example.json')
        .done(function(data){

            var newContent = '';
            for (var i = 0; i < responseObject.events.length; i++){
                newContent += '<div class="card mb-3">';
                newContent += '<a href="/browse/detail">';
                newContent += '<img class="card-img-top" src="' + responseObject.events[i].image + '" width="100px180" alt="Card image cap">';
                newContent += '<div class="card-body">';
                newContent += '<h1 class="card-title">' + responseObject.events[i].building + responseObject.events[i].roomNum + '<span class="badge badge-primary"></h1>'
                newContent += '<p class="card-text">';
                newContent += '환경점수: '  + responseObject.events[i].envScore + '/5 </p>';
                newContent += '<p class="card-text">';
                newContent += '<img src="image/glyphicons/glyphicons-55-clock.png"/>';
                newContent +=  responseObject.events[i].hourUntil + ':'  + responseObject.events[i].minUntil + '까지 사용 가능 (' +  + responseObject.events[i].timeLeft + '남음) </p>';
                newContent += '</div>';
            }
    
            document.getElementById('rooms').innerHTML = newContent;
        }).fails(function(){
            document.getElementById('rooms').innerHTML = ('<p>현재 사용가능한 강의실이 없습니다</p>');
        });
    }

//xhr.open('GET', 'data/data.json', true);
//xhr.send(null);
function load() {
    var $browseCode = $('HELLO WORLD');
    $('li').after($browseCode);
});

function ifChecked() {
    var loca = new Array(3);
    var facil = new Array(5);
    var roomSize = document.getElementById('roomSize').value;
    var population = document.getElementById('numPeople').value;
    
    loca[0] = document.getElementById('J').checked;
    loca[1] = document.getElementById('K').checked;
    loca[2] = document.getElementById('AS').checked;
    loca[3] = document.getElementById('GN').checked;
    
    facil[0] = document.getElementById('projector').checked;
    facil[1] = document.getElementById('computer').checked;
    facil[2] = document.getElementById('charger').checked;
    facil[3] = document.getElementById('window').checked;
    facil[4] = document.getElementById('sepTable').checked;
    facil[5] = document.getElementById('wBoard').checked;
    
    for(var i = 0; i <= 3; i++){
        document.write(loca[i]+"<br/>");
    }
    document.write("<br/>");
    for(i = 0; i <= 5; i++){
        document.write(facil[i]+"<br/>");
    }
    document.write("population: "+population);
    document.write("roomSize: "+roomSize);
}

function sort(){
    var sortBy = document.getElementById('sortBy').value;
    msg = "sort by " + sortBy;
    alert(msg);
}