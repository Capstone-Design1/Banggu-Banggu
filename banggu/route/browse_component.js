var browseRoomComponent = {
    template: `
    <div class="w-100 p-3">
    <div class="panel panel-default"><a :href="'/browse/' + room.name">
        <div class="panel-body">
            <div class="row">
                <div class="col-xs-6">
                    <img :src="'/image/' + room.floor_plan" alt="room1" class="img-responsive"></div>
                <div class="col-xs-6">
                    <div class="room-very-good" v-if="room.score >= 4">
                        <h1> {{room.name}}
                        <span class="badge alert-info">
                            최고예요!</span>
                        </h1>
                        <h4>환경점수: {{room.score}}/5</h4>
                    </div>
                    <div class="room-good" v-else-if="room.score >= 3">
                        <h1> {{room.name}}
                        <span class="badge alert-success">
                            좋아요!</span>
                        </h1>
                        <h4>환경점수: {{room.score}}/5</h4>
                    </div>
                    <div class="room-soso" v-else-if="room.score >= 2">
                        <h1> {{room.name}}
                        <span class="badge alert-warning">
                            그저그래요!</span>
                        </h1>
                        <h4>환경점수: {{room.score}}/5</h4>
                    </div>
                    <div class="room-bad" v-else-if="room.score >= 1">
                        <h1> {{room.name}}
                        <span class="badge alert-warning">
                            별로예요!</span>
                        </h1>
                        <h4>환경점수: {{room.score}}/5</h4>
                    </div>
                    <div class="room-very-bad" v-else> 
                        <h1> {{room.name}}
                        <span class="badge alert-dark">
                            방귀냄새!</span>
                        </h1>
                        <h4>환경점수: {{room.score}}/5</h4>
                    </div></div></div>
<!--            <p><img src="/image/glyphicons/glyphicons-55-clock.png"/>
16:23 까지 사용 가능 (1:23 남음)</p> -->
        </div>
    </a></div></div>
    `,
    props: {
        room: Object
    }
}

exports.browseRoomComponent = browseRoomComponent;
