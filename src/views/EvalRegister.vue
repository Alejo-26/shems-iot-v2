<template>
  <div id="container-register">
    <ImageSVG nameImage="electricVehicle" width="95vw" />
    <h1 id="header-form">EV registration</h1>
    <p id="instruction-text">
      Please fil out the following information about your electric vehicle
    </p>
    <!--<form id="formRegister" @submit="checkForm">-->
    <form id="formRegister" >
      <label for="model">Model of the Vehicle</label>
      <input type="text" id="model" v-model="newVehicle.name" />
      <label for="depaA">Departure time</label>
      <input type="time" id="depaA" v-model="newVehicle.departure" />
      <label for="arrival">Arrival time</label>
      <input type="time" id="arrival" v-model="newVehicle.arrival" />
      <label for="baterry">Minimum baterry</label>
      <input type="number" id="baterry" v-model="newVehicle.miniBaterry" />
      <spam id="errors-form" v-if="errors.length > 0">
        <ul>
          <li v-for="(error, index) in errors" v-bind:key="index">
            {{ error }}
          </li>
        </ul>
      </spam>
      <input type="submit" value="Back" @click="comeBack()"/>
      <input type="submit" value="Next" @click="saveData2()"/>
    </form>
  </div>
</template>

<script>
import ImageSVG from "../components/FileSvg.vue";
import axios from "axios";
export default {
  data() {
    return {
      newVehicle:{
      id:1,
      name: "",
      departure: "",
      arrival: "",
      miniBaterry: "",
      imgSrc: "electricVehicle",
      },
      errors: []
    };
  },
  methods: {
    async comeBack() {
      //switch to the other layout
      this.$router.push({ name: "applianceRegister" });
    },

    async saveData2(){
      try{
        alert("Electric vehicle registered succesfully")
        //const res = await axios.put(process.env.VUE_APP_API_URL + "appliances-registered/" + this.newVehicle.id, this.newVehicle)
        const res = await axios.post(process.env.VUE_APP_API_URL + "appliances-registered", this.newVehicle)
        console.log(this.payload)
        console.log(res)
        this.$router.push({ name: "applianceRegister" })
      }catch (e){
        console.error(e)
      }
    },
    checkForm(e) {
      this.errors = [];
      e.preventDefault();
      if (this.model == "") {
        this.errors.push("Model is mandatory");
      }
      if (this.departure == "") {
        this.errors.push("Departure is mandatory");
      }
      if (this.arrival == "") {
        this.errors.push("Arrival is mandatory");
      }
      if (this.miniBaterry == "") {
        this.errors.push("Minimum battery is mandatory");
      }
      if (this.errors.length == 0) {
        //Save Information
        //this.saveData2();
      }
    },
  },
  components: {
    ImageSVG,
  },
};
</script>

<style lang="scss" scoped>
#container-register {
  text-align: center;

  #instruction-text {
    font-size: clamp(1em, 1.3vw, 1.6em);
    margin-top: 1em;
  }
  img {
    margin: 0 auto;
  }
  #formRegister {
    display: flex;
    margin-top: 1em;
    flex-direction: column;
    padding: 0em 1em;
    text-align: center;
    gap: 0.5em;
    input[type="text"] {
      border: 2px solid black;
      padding: 0.2em 0.2em;
      font-size: clamp(1.8em, 2.1vw, 2.2em);
    }
    input[type="number"] {
      border: 2px solid black;
      padding: 0.2em 0.2em;
      font-size: clamp(1.8em, 2.1vw, 2.2em);
    }
    input[type="time"] {
      border: 2px solid black;
      padding: 0.2em 0.2em;
      font-size: clamp(1.8em, 2.1vw, 2.2em);
    }
    input[type="submit"] {
      border: 2px solid black;
      padding: 0.2em 0.2em;
      margin-top: 1em;
      width: 100%;
      align-self: center;
      font-size: clamp(1.5em, 1.8vw, 2em);
      margin-bottom: 1em;
      background-color: #95cafe;
      border-radius: 5px;
    }
    label {
      text-align: start;
      font-weight: bold;
      font-size: clamp(1.2em, 1.4vw, 1.8em);
    }
  }
  #errors-form {
    color: rgb(168, 14, 14);
    font-weight: bold;
    font-size: clamp(1em, 1.3vw, 1.6em);
    ul {
      list-style-type: none;
    }
  }
}
</style>
