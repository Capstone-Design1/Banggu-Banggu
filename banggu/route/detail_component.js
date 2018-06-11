/*NOTE: NO NEED TO SCALE SCORE IN RANGE (0, 5)*/

var listEnvironmentComponent = {
    data () {
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
                            <div class="room-very-good" v-if="room_env.discomfort < 68">
                                <img src="/image/glyphicons/verygood.png"/><br/>최고예요!
                            </div>
                            <div class="room-good" v-else-if="room_env.discomfort < 75">
                                <img src="/image/glyphicons/good.png"/><br/>좋아요!
                            </div>
                            <div class="room-soso" v-else-if="room_env.discomfort < 80">
                                <img src="/image/glyphicons/soso.png"/><br/>그저그래요!
                            </div>
                            <div class="room-bad" v-else-if="room_env.discomfort < 85">
                                <img src="/image/glyphicons/bad.png"/><br/>별로예요!
                            </div>
                            <div class="room-very-bad" v-else>
                                <img src="/image/glyphicons/verybad.png"/><br/>방귀냄새!
                            </div>
                        </span></td>

                        <td align="center"><span>
                            <div class="room-very-good" v-if="room_env.co2 <= 450">
                                <img src="/image/glyphicons/verygood.png"/><br/>최고예요!
                            </div>
                            <div class="room-good" v-else-if="room_env.co2 <= 700">
                                <img src="/image/glyphicons/good.png"/><br/>좋아요!
                            </div>
                            <div class="room-soso" v-else-if="room_env.co2 <= 1000">
                                <img src="/image/glyphicons/soso.png"/><br/>그저그래요!
                            </div>
                            <div class="room-bad" v-else-if="room_env.co2 <= 2000">
                                <img src="/image/glyphicons/bad.png"/><br/>별로예요!
                            </div>
                            <div class="room-very-bad" v-else>
                                <img src="/image/glyphicons/verybad.png"/><br/>방귀냄새!
                            </div>
                        </span></td>

                        <td align="center"><span>
                            <div class="room-very-good" v-if="room_env.dust <= 30">
                                <img src="/image/glyphicons/verygood.png"/><br/>최고예요!
                            </div>
                            <div class="room-good" v-else-if="room_env.dust <= 50">
                                <img src="/image/glyphicons/good.png"/><br/>좋아요!
                            </div>
                            <div class="room-soso" v-else-if="room_env.dust <= 100">
                                <img src="/image/glyphicons/soso.png"/><br/>그저그래요!
                            </div>
                            <div class="room-bad" v-else-if="room_env.dust <= 150">
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
exports.env_component = listEnvironmentComponent;
