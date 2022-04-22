<template>
  <div class="container">
    <div class="icon-image">
      <SvgImage nameImage="welcome-home" width="100px" height="auto" />
      <p id="letter-icon">SHEMS</p>
    </div>
    <h2>Registration</h2>
    <div id="username" class="input-text">
      <p>Family name</p>
      <input type="text" v-model="newRegistration.userName2" />
    </div>

    
    <div id="Comfort">
      <h2><strong>Comfort Parameters</strong></h2>
      <div id="temMax" class="input-text">
        <p>Maximum temperature of comfort</p>
        <input type="number" v-model="newRegistration.temMax2" />
      </div>
      <div id="temMin" class="input-text">
        <p>Minimum temperature of comfort</p>
        <input type="number" v-model="newRegistration.temMin2" />
      </div>
      <div id="temMaxEnvi" class="input-text">
        <p>Maximum temperature of the enviroment</p>
        <input type="number" v-model="newRegistration.temMaxEnvi2" />
      </div>
      <div id="temMinEnvi" class="input-text">
        <p>Minimum temperature of the enviroment</p>
        <input type="number" v-model="newRegistration.temMinEnvi2" />
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
  data() {
    return {
      newRegistration:{
        userName2: "Segafredo",
        temMax2:"23",
        temMin2:"45",
        temMaxEnvi2:"28",
        temMinEnvi2:"34",
      }
      
    };
  },
  components: {
    SvgImage,
  },
  methods:{
    async postData(){
      try{
        const res = await axios.post(process.env.VUE_APP_API_URL + "registration",this.newRegistration)
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
