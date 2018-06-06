/*
- room_env={
    discomfort: 0~5 index
    co2: 0~5 index
    pm: 0~5 index
}

- img 수정해야함
*/

var listEnvironmentComponent = {
    data () {
        room_env
    },
    template: `
        <table class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <td align="center"><span style="font-weight:bold">불쾌지수</span></td>
                        <td align="center"><span style="font-weight:bold">CO2</span></td>
                        <td align="center"><span style="font-weight:bold">미세먼지</span></td>
                    </tr>
                    <tr>
                        <td align="center"><span>
                            <div class="room-very-good" v-if="room_env.discomfort >= 4">
                                <img src="/image/glyphicons/verygood.png"/><br/>아주 좋아요!
                            </div>
                            <div class="room-good" v-else-if="room_env.discomfort >= 3">
                                <img src="/image/glyphicons/good.png"/><br/>좋아요!
                            </div>
                            <div class="room-soso" v-else-if="room_env.discomfort >= 2">
                                <img src="/image/glyphicons/soso.png"/><br/>그저그래요!
                            </div>
                            <div class="room-bad" v-else-if="room_env.discomfort >= 1">
                                <img src="/image/glyphicons/bad.png"/><br/>별로예요!
                            </div>
                            <div class="room-very-bad" v-else>
                                <img src="/image/glyphicons/verybad.png"/><br/>방귀냄새!
                            </div>
                        </span></td>

                        <td align="center"><span>
                            <div class="room-very-good" v-if="room_env.co2 >= 4">
                                <img src="/image/glyphicons/verygood.png"/><br/>아주 좋아요!
                            </div>
                            <div class="room-good" v-else-if="room_env.co2 >= 3">
                                <img src="/image/glyphicons/good.png"/><br/>좋아요!
                            </div>
                            <div class="room-soso" v-else-if="room_env.co2 >= 2">
                                <img src="/image/glyphicons/soso.png"/><br/>그저그래요!
                            </div>
                            <div class="room-bad" v-else-if="room_env.co2 >= 1">
                                <img src="/image/glyphicons/bad.png"/><br/>별로예요!
                            </div>
                            <div class="room-very-bad" v-else>
                                <img src="/image/glyphicons/verybad.png"/><br/>방귀냄새!
                            </div>
                        </span></td>

                        <td align="center"><span>
                            <div class="room-very-good" v-if="room_env.pm >= 4">
                                <img src="/image/glyphicons/verygood.png"/><br/>아주 좋아요!
                            </div>
                            <div class="room-good" v-else-if="room_env.pm >= 3">
                                <img src="/image/glyphicons/good.png"/><br/>좋아요!
                            </div>
                            <div class="room-soso" v-else-if="room_env.pm >= 2">
                                <img src="/image/glyphicons/soso.png"/><br/>그저그래요!
                            </div>
                            <div class="room-bad" v-else-if="room_env.pm >= 1">
                                <img src="/image/glyphicons/bad.png"/><br/>별로예요!
                            </div>
                            <div class="room-very-bad" v-else>
                                <img src="/image/glyphicons/verybad.png"/><br/>방귀냄새!
                            </div>
                        </span></td>

                    </tr>
                </thead>
            </table>
        </table>        
    `,
    props: {
        room_env: Object
    }
}

exports.browseRoomComponent = listEnvironmentComponent;

var listFacilitiesComponent = {
    data () {
        img = [
            "glyphicons/glyphicons-22-snowflake.png", // air conditioner
            "glyphicons/glyphicons-266-electrical-plug.png", // plug
            "glyphicons/glyphicons-232-sun.png", // window
            "glyphicons/glyphicons-139-picture", // screen
            "glyphicons/glyphicons-691-laptop", // computer
            "glyphicons/glyphicons-170-record.png" // projector
            "glyphicons/glyphicons-74-wifi.png", // wifi
            "glyphicons/glyphicons-214-arrow-up.png", // elevator
        ],
        fac_name =  [
            "에어컨",
            "플러그",
            "창문",
            "스크린",
            "컴퓨터",
            "프로젝터",
            "wifi",
            "엘레베이터"
        ]
    },
    template: `
        <table class="table-responsive">
        <table class="table">
        <thead>
            <template v-for="(pair, index) in facility" v-if="index < max_lines">
                <tr>
                <td align="center"><img :src="'/image/'+img[pair[0]]"></td>
                <td> {{ fac_name[pair[0]] }} </td>
                <template v-if="pair.length == 2">
                    <td align="center"><img :src="'/image/'+img[pair[1]]"></td>
                    <td> {{ fac_name[pair[1]] }} </td>
                </template>
                <template v-else>
                <td align="center"></td><td></td></template>
                </tr>
            </template>
        </thead>
        </table>
        </table>
        `,
    props: {
        facility: Object,
        img: Array,
        fac_name: Array,
        max_lines: Number
    }
}

exports.component = listFacilitiesComponent;
