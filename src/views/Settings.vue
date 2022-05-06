<template>
  <div class="container">
    <div class="icon-image">
      <SvgImage nameImage="welcome-home" width="100px" height="auto" />
      <p id="letter-icon">SHEMS</p>
    </div>
    <h2>Settings</h2>
    <div id="username" class="input-text">
      <p>Family name</p>
      <input type="text" v-model="newRegistration.userName2" />
    </div>

    
    <div id="Comfort">
      <h2><strong>Comfort Parameters</strong></h2>
      <div id="temMax" class="input-text">
        <p>Maximum interior temperature </p>
        <input type="number" v-model="newRegistration.Tin_max" />
      </div>
      <div id="temMin" class="input-text">
        <p>Minimum interior temperature </p>
        <input type="number" v-model="newRegistration.Tin_min" />
      </div>
      <div id="temMaxEnvi" class="input-text">
        <p>Maximum temperature of the water</p>
        <input type="number" v-model="newRegistration.Tewh_max" />
      </div>
      <div id="temMinEnvi" class="input-text">
        <p>Minimum temperature of the water</p>
        <input type="number" v-model="newRegistration.Tewh_min" />
      </div>
    </div>
    <div id="Comfort">
      <h2><strong>Energy storage system</strong></h2>
      <div id="temMax" class="input-text">
        <p>Maximum level of the batteries </p>
        <input type="number" v-model="newRegistration.Cess_thresh_high" />
      </div>
      <div id="temMin" class="input-text">
        <p>Minimum level of the batteries </p>
        <input type="number" v-model="newRegistration.Cess_thresh_low" />
      </div>
    </div>
    <div id="Comfort">
      <h2><strong>Electric vehicle</strong></h2>
      <div id="temMax" class="input-text">
        <p>Maximum level </p>
        <input type="number" v-model="newRegistration.Cpev_thresh_high" />
      </div>
      <div id="temMin" class="input-text">
        <p>Minimum level </p>
        <input type="number" v-model="newRegistration.Cpev_thresh_low" />
      </div>
      <div id="temMin" class="input-text">
        <p>Usually time of arrival </p>
        <input type="time" v-model="newRegistration.time_arrival" />
      </div>
    </div>


    <div id="registerButoon" class="input-text">
      <input  value="Register" type="submit" @click="postData()"/>
      <input  value="Next" type="submit" @click="nextData()"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import SvgImage from "../components/FileSvg.vue";
import axios from "axios";
export default {
  async mounted() {
    //let url = process.env.VUE_APP_API_URL + "settingsoldParameters";
    let url = process.env.VUE_APP_API_URL + "settings/oldParameters";
    //let url = process.env.VUE_APP_API_URL + "/SHEMS/settings/oldParameters";
    await axios
      .get(url)
      .then((response) => {
        this.newRegistration = response.data;
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
      newRegistration:{
        action:"changeSetpoints",
        userName2: "Segafredo",
        Tin_max: "23",
        Tin_min: "45",
        Tewh_max: "28",
        Tewh_min: "18",
        Cess_thresh_low: "0.2",
        Cess_thresh_high: "0.8",
        Cpev_thresh_low: "0.2",
        Cpev_thresh_high: "0.8",
        time_arrival: "",
      }
      
    };
  },
  components: {
    SvgImage,
  },
  methods:{
    async postData(){
      try{
        this.newRegistration.action="changeSetpoints"
        const res = await axios.post(process.env.VUE_APP_API_URL + "settings",this.newRegistration)
        //const res = await axios.post(process.env.VUE_APP_API_URL + "settings",this.newRegistration)
        //const res = await axios.post(process.env.VUE_APP_API_URL + "settings/oldParameters",this.newRegistration)
        alert("Information saved succesfully")
      }catch (e){
        console.error(e)
      }
    },
    async nextData() {
      //save the data with axios
      console.log("Data saved");
      //switch to the other layout
      this.$router.push({ name: "applianceRegister" });
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 100%;
  text-align: center;
  .icon-image {
    text-align: center;

    #letter-icon {
      font-size: 1.4em;
      font-weight: bold;
      letter-spacing: 5px;
      color: #5eaffb;
    }
  }
  h2 {
    padding: 1em 0em;
  }
  .input-text {
    display: flex;
    flex-direction: column;
    padding: 1em 2em;
    p {
      align-self: start;
      font-weight: bold;
    }
    input[type="text"],
    input[type="password"] {
      padding: 0.5em 0.5em;
      font-size: clamp(0.8em, 2vw, 4em);
    }
    input[type="submit"] {
      width: 30vw;
      margin: 0 auto;
      font-size: clamp(0.8em, 2vw, 6em);
      padding: 0.5em;
      border: 2px solid black;
      border-radius: 7px;
      font-weight: bold;
      background-color: #94cafe;
    }
  }
}
</style>
