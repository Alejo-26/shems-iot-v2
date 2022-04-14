<template>
  <div id="containerActivity">
    <h2>Scheduling</h2>
    <table>
      <tr v-for="(device, index) in listDevices" v-bind:key="index">
        <td>
          <div class="containerdDeviceImage">
            <ImageSVG :nameImage="device.imgSrc" width="50vw" />
          </div>
        </td>
        <td>
          <div id="details-device">
            <p id="stateDevice">{{ device.state }} {{ device.name }}</p>
            <p id="hourDevice">{{ device.time }}</p>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import ImageSVG from "../components/FileSvg.vue";
import axios from "axios";
export default {
  async mounted() {
    let url = process.env.VUE_APP_API_URL + "listDevices";
    await axios
      .get(url)
      .then((response) => {
        this.listDevices = response.data;
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            console.log("error");
            break;
        }
      });
  },
  data() {
    return {
      listDevices: [],
    };
  },
  components: {
    ImageSVG,
  },
};
</script>

<style lang="scss" scoped>
#containerActivity {
  h2 {
    text-align: center;
  }

  table {
    width: auto;
    margin: 2em 1em;
    border-collapse: none;
    border-spacing: 1em 1.2em;
    tr {
      td {
        &:nth-child(1) {
          .containerdDeviceImage {
            display: flex;
            justify-content: center;
            border-radius: 100%;
            background-color: #95cafe;
            width: clamp(6em, 14vw, 16em);
            height: clamp(6em, 14vw, 16em);
          }
        }
        &:nth-child(2) {
          #details-device {
            display: block;

            p {
              &:nth-child(1) {
                font-weight: bold;
                font-size: clamp(1em, 1.4vw, 1.6em);
                overflow-wrap: break-word;
              }
              &:nth-child(1) {
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
}
</style>
