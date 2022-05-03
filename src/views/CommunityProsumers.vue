<template>
  <div id="container-registerDevices" >
    <h2>Community transactions</h2>
    <table class="list-devices" >
      <tr
        id="deviceElement"
        v-for="(device, index) in listDevices"
        :key="index"
      >
        <td>
          <div class="details-devices" style="background-color: #95cafe;padding:10px">
            <p><strong>Name: </strong>{{ device.name }}</p>
            <p><strong>Interactions: </strong>{{ device.interactions }}</p>
            <p><strong>Total energy sold: </strong>{{ device.tot_energy }}</p>
            <p><strong>Average price: </strong>{{ device.price_energy }}</p>
<!--             <p><strong>From: </strong>{{ device.starting_time}}</p>
            <p><strong>To: </strong>{{ device.ending_time}}</p> -->
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
/* eslint-disable */
import FileImage from "../components/FileSvg.vue";
import axios from "axios";
export default {
  data() {
    return {
      listDevices: [],
      modalIsOpen: false,
    };
  },
  async mounted() {
    let url = process.env.VUE_APP_API_URL + "communityprosumers";
    //let url = process.env.VUE_APP_API_URL + "community/Prosumers";
    await axios
      .get(url)
      .then((response) => {
        this.listDevices = response.data;
        console.log(this.listDevices)
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            console.log("error");
            break;
        }
      });
  },
  methods: {
    changeModal() {
      this.modalIsOpen = !this.modalIsOpen;
    },

    registerData(type) {
      switch (type) {
        case "ev":
          this.$router.push({ name: "evregistration" });
          return;
        case "comfort":
          this.$router.push({ name: "comfortParameters" });
          return;
        default:
          return;
      }
    },
  },
  components: {
    FileImage,
  },
};
</script>

<style lang="scss" scoped>
#container-registerDevices {
  position: relative;
  height: 100%;
  h2 {
    margin-left: 1em;
  }
  table.list-devices {
    margin-top: 2em;

    text-align: left;
    width: 100%;
    border-collapse: none;
    border-spacing: 2em 1em;
    tr#deviceElement {
      td {
        &:nth-child(1) {
          button {
            border: none;
            background-color: #95cafe;
            border-radius: 100%;
            width: 20vw;
            height: 20vw;
          }
        }
        &:nth-child(2) {
          .details-devices {
            p {
              &:nth-child(1) {
                font-weight: bold;
                font-size: clamp(1.2em, 1.6vw, 2em);
              }
              &:nth-child(2) {
                font-size: clamp(1em, 1.3vw, 1.6em);
                color: #1a1a1bc4;
              }
              &:nth-child(3) {
                font-size: clamp(1em, 1.3vw, 1.6em);
                color: #1a1a1bc4;
              }
            }
          }
        }
      }
    }
    tr#addElement {
      td {
        &:nth-child(1) {
          button {
            background-color: #95cafe;
            border-radius: 100%;
            width: 20vw;
            height: 20vw;
            border: none;
            font-size: clamp(2.5em, 3vw, 4em);
            font-weight: bold;
          }
        }
        &:nth-child(2) {
          font-size: clamp(1.2em, 1.8vw, 2em);
          font-weight: bold;
        }
      }
    }
  }
  .modal-select {
    display: grid;
    position: absolute;
    width: 100%;
    height: 100vh;
    place-items: center;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    #containt-data {
      border: 2px solid black;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1em;
      width: 80%;
      height: 50%;
      background-color: white;
      border-radius: 10px;
      padding: 1em;

      button {
        border: none;
        font-size: clamp(1.8em, 2.2vw, 2.5em);
        padding: 1em;
        border-radius: 5px;
        background-color: #95cafe;
      }
    }
  }
}
</style>
