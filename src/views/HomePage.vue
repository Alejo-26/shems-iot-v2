<template>
  <div id="container-home">
    <label id="welcome-message">Hi {{ this.nameUser.name }}!</label>
    <div id="resume-devices">
      <button v-if="this.allDevices.length > 0">
        <FileImage :nameImage="this.allDevices[0].imgSrc" width="60vw" />
        <p>{{ this.allDevices[0].name }}</p>
      </button>
      <div id="other-sect">
        <button>
          <FileImage :nameImage="this.allDevices[1].imgSrc" width="40vw" />
          <p>{{ this.allDevices[1].name }}</p>
        </button>
        <button @click="seeAllDevices">
          ---
          <p>Others</p>
        </button>
      </div>
    </div>
    <div id="resume-consuptiom">
      <div id="detailsElem">
        <h2>{{ this.infoResume.consumptionToday }}kWh</h2>
        <p>Consumption today</p>
      </div>
      <div id="detailsElem">
        <h2>
          {{
            this.infoResume.activeDevices > 9
              ? this.infoResume.activeDevices
              : "0" + String(this.infoResume.activeDevices)
          }}/{{
            this.infoResume.totalDevices > 9
              ? this.infoResume.totalDevices
              : "0" + String(this.infoResume.totalDevices)
          }}
        </h2>
        <p>Active devices</p>
      </div>
    </div>
    <div id="advice">
      <div id="advice-text">
        <p id="head-text">
          Switch off and save {{ this.devicesRecommend.porcentageSave }}
        </p>
        <p id="descrip-text">
          It seems your {{ this.devicesRecommend.nameDevice }} is on once since
          {{ this.devicesRecommend.time }}
        </p>
      </div>
      <button id="turn-button">Turn Off</button>
    </div>
  </div>
</template>

<script>
import FileImage from "../components/FileSvg.vue";
import axios from "axios";
export default {
  async mounted() {
    //Name
    let url = process.env.VUE_APP_API_URL + "user";
    await axios
      .get(url)
      .then((response) => {
        this.nameUser = response.data;
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            console.log("error");
            break;
        }
      });
    //Devices
    let url2 = process.env.VUE_APP_API_URL + "listDevices";
    await axios
      .get(url2)
      .then((response) => {
        this.allDevices = response.data;
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            console.log("error");
            break;
        }
      });

    //Saving
    let url3 = process.env.VUE_APP_API_URL + "resumeGeneral";
    await axios
      .get(url3)
      .then((response) => {
        this.infoResume = response.data;
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            console.log("error");
            break;
        }
      });
    //resume
    let url4 = process.env.VUE_APP_API_URL + "recommended";
    await axios
      .get(url4)
      .then((response) => {
        this.devicesRecommend = response.data;
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
      nameUser: "",
      allDevices: [
        {
          name: "",
          imgSrc: "welcome-home",
          details: "",
          state: "",
          time: "",
        },
        {
          name: "",
          imgSrc: "welcome-home",
          details: "",
          state: "",
          time: "",
        },
      ],
      infoResume: {
        consumptionToday: "45",
        activeDevices: 4,
        totalDevices: 40,
      },
      devicesRecommend: { porcentageSave: "", nameDevice: "", time: "" },
    };
  },
  components: {
    FileImage,
  },
  methods: {
    seeAllDevices() {
      this.$router.push({
        //name: "listDevices",
        name: "activeDevices",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#container-home {
  display: grid;
  grid-template-rows: repeat(3, auto) 1fr;
  height: 100%;
  #welcome-message {
    font-size: clamp(1.8em, 3vw, 4em);
    color: #1e486e;
    font-weight: bold;
    grid-row: 1/2;
  }
  #resume-devices {
    display: grid;
    grid-row: 2/3;
    grid-template-columns: repeat(2, auto);
    place-items: center;
    margin-top: 0.5em;
    & > button {
      border-radius: 100%;
      width: clamp(12em, 18vw, 22em);
      height: clamp(12em, 18vw, 22em);

      border: none;
      background-color: #95cafe;
      font-size: clamp(0.8em, 2vw, 2.2em);
    }
    #other-sect {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1em;
      & > button {
        width: clamp(10em, 15vw, 18em);
        height: clamp(10em, 15vw, 18em);
        padding: 0 1em;
        border: none;
        border-radius: 100%;
        background-color: #95cafe;
        font-size: clamp(0.7em, 2vw, 2.7em);
        &:nth-child(2) {
          width: clamp(9em, 14vw, 17em);
          height: clamp(9em, 14vw, 17em);
        }
      }
    }
  }
  #resume-consuptiom {
    margin-top: 1em;
    display: flex;
    grid-row: 3/4;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    text-align: center;
    gap: 0.5em;
    #detailsElem {
      flex: 1;
      background-color: #95cafe;

      padding: 1em 0em;
      border-radius: 5px;
      p {
        font-size: clamp(0.8em, 2vw, 2em);
      }
      &:nth-child(1) {
        margin-left: 0.5em;
      }
      &:nth-child(2) {
        margin-right: 0.5em;
      }
    }
  }
  #advice {
    grid-row: 4/5;
    padding: 1em 0.5em;
    align-self: center;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    margin: 1em 0;
    justify-content: space-around;
    background-color: #fff9e9;
    #turn-button {
      background-color: #ffc976;
      border: none;
      border-radius: 5px;
      flex: 0 0 150px;
      padding: 1em 0;
      align-self: center;
    }
    #advice-text {
      p#head-text {
        font-weight: bold;
        font-size: clamp(0.8em, 1.5vw, 1.8em);
      }
      p#descrip-text {
        font-size: clamp(0.65em, 1.3vw, 1.5em);
      }
    }
  }
}
</style>
