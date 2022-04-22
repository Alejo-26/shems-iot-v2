<template>
  <div id="container-register">
    <ImageSVG nameImage="welcome-home" width="95vw" />
    <h1 id="header-form">New appliance registration</h1>
    <p id="instruction-text">
      Please fil out the following information about your appliance
    </p>
    <form id="formRegister" @submit="checkForm">
      <label for="device">Select your appliance</label>
      <select id="device" v-model="selected">
        <option disabled value="">Please select one</option>
        <option>Diswasher</option>
        <option>Hair dryer</option>
        <option>Humidifier</option>
        <option>Oven</option>
        <option>Rice cooker</option>
        <option>Robot cleaner</option>
        <option>Vacuum cleaner</option>
        <option>Washing machine</option>
      </select>
      <span>Selected: {{ selected }}</span>

      <label for="details">Brand of the appliance</label>
      <input type="text" id="details"  v-model="newAppliance.details" />


      <spam id="errors-form" v-if="errors.length > 0">
        <ul>
          <li v-for="(error, index) in errors" v-bind:key="index">
            {{ error }}
          </li>
        </ul>
      </spam>
      
      <input type="submit" value="Save" @click="saveData2()"/>
      <input type="submit" value="Back" @click="comeBack()"/>
    </form>

    
  </div>
</template>

<script>
import ImageSVG from "../components/FileSvg.vue";
import axios from "axios";
export default {
  data() {
    return {
    
      newAppliance:{
        id: "",
        name:"",
        imgSrc: "",
        details: "",
      },
      errors: [],
      selected: '',
    };
  },
  methods: {
    async comeBack() {
      //save the data with axios
      console.log("Data saved");
      //switch to the other layout
      this.$router.push({ name: "applianceRegister" });
    },
    async DeleteInfo(){
        //axios.delete((process.env.VUE_APP_API_URL + "scheduling",this.newDevice))
        console.log("Its working")
    },
    checkForm(e) {
      this.errors = [];
      e.preventDefault();
      if (this.device == "") {
        this.errors.push("Model is mandatory");
      }
      if (this.newTime2 == "") {
        this.errors.push("newTime2 is mandatory");
      }
      if (this.errors.length == 0) {
        //Save the information
      }
    },
    fillInformation(){
      if (this.selected == "Washing machine"){this.newAppliance.name=this.selected,this.newAppliance.imgSrc="washingMachine",this.newAppliance.id=2}
      if (this.selected == "Diswasher"){this.newAppliance.name=this.selected,this.newAppliance.imgSrc="dishWasher",this.newAppliance.id=3}
      if (this.selected == "Oven"){this.newAppliance.name=this.selected,this.newAppliance.imgSrc="oven",this.newAppliance.id=4}
      if (this.selected == "Rice cooker"){this.newAppliance.name=this.selected,this.newAppliance.imgSrc="riceCooker",this.newAppliance.id=5}
      if (this.selected == "Hair dryer"){this.newAppliance.name=this.selected,this.newAppliance.imgSrc="hairDryer",this.newAppliance.id=6}
      if (this.selected == "Humidifier"){this.newAppliance.name=this.selected,this.newAppliance.imgSrc="humidifier",this.newAppliance.id=7}
      if (this.selected == "Robot cleaner"){this.newAppliance.name=this.selected,this.newAppliance.imgSrc="robotCleaner",this.newAppliance.id=8}
      if (this.selected == "Vacuum cleaner"){this.newAppliance.name=this.selected,this.newAppliance.imgSrc="vacuumCleaner",this.newAppliance.id=9}
    },
    async saveData2(){
      try{
        this.fillInformation()
        const res = await axios.post(process.env.VUE_APP_API_URL + "appliances-registered", this.newAppliance)
        console.log(this.payload)
        alert("Appliance registered succesfully")
        console.log(res)
      }catch (e){
        console.error(e)
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
