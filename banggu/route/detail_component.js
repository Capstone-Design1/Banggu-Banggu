var listFacilitiesComponent = {
    data () {
        img = [
            "glyphicons/glyphicons-22-snowflake.png", // air conditioner
            "glyphicons/glyphicons-564-person-wheelchair.png", // easy access
            "glyphicons/glyphicons-266-electrical-plug.png", // plug
            "glyphicons/glyphicons-74-wifi.png", // wifi
            "glyphicons/glyphicons-232-sun.png", // window
            "glyphicons/glyphicons-214-arrow-up.png", // elevator
            "glyphicons/glyphicons-87-display.png", // computer
            "glyphicons/glyphicons-170-record.png" // projector
        ],
        fac_name =  [
            "에어컨",
            "접근성 우수",
            "플러그",
            "wifi",
            "창문",
            "엘레베이터",
            "컴퓨터",
            "프로젝터"
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
