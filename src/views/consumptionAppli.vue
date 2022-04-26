<template>
  <div>
    <h2 style="text-align: center; margin-bottom: 2em">{{title}}</h2>

    <div v-if="title==='Washing machine'">
      <bar-line v-if="loaded" :chartData="chartData2" :options="options" />
    </div>

    <div v-if="title==='Dishwasher'">
      <bar-line v-if="loaded" :chartData="chartData3" :options="options" />
    </div>

    <div v-if="title==='Electric vehicle'">
      <bar-line v-if="loaded" :chartData="chartData4" :options="options" />
    </div>

    

    <div style="text-align:center;margin-top:20px">
      <input type="submit" value="Back" @click="comeBack()" style="background-color: #95cafe;"/>
    </div>
    
    <!-- <h2>{{this.chartData.datasets.data}}</h2> -->
  </div>
</template>

<script>
/* eslint-disable */
import LineGraphic from "../components/LineChart.vue";
import axios from "axios";

export default {
  
  async mounted() {
    this.llamada1();
    this.llamada2();
    
  },
  data() {
    //vue-chart.vue
    return {
      title:"",
      loaded:false,
      chartData2: {
        labels: [],
        datasets: [
          {
            label: "Consumption in Watts",
            borderWidth: 1,
            fill: false,
            backgroundColor: '#95cafe',
            borderColor: 'rgb(75, 192, 192)',
            pointBorderColor: "#2554FF",
            data: []
          },
        ],
      },
      chartData3: {
        labels: [],
        datasets: [
          {
            label: "Consumption in Watts",
            borderWidth: 1,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            pointBorderColor: "#2554FF",
            data: []
          },
        ],
      },
      chartData4: {
        labels: [],
        datasets: [
          {
            label: "Consumption in Watts",
            borderWidth: 1,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            pointBorderColor: "#2554FF",
            data: []
          },
        ],
      },
      chartData5: {
        labels: [],
        datasets: [
          {
            label: "Consumption in Watts",
            borderWidth: 1,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            pointBorderColor: "#2554FF",
            data: []
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  components: {
    "bar-line": LineGraphic,
  },
  methods:{
    async llamada1(){
      //Consulta los datos para graficar;
    let url = process.env.VUE_APP_API_URL + "consumption-appli";
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data)
        this.chartData2.datasets[0].data = response.data.dataWashingMachine
        this.chartData2.labels = response.data.labelsWashingMachine
        this.chartData3.datasets[0].data = response.data.dataDishwasher
        this.chartData3.labels = response.data.labelsDishwasher
        this.chartData4.datasets[0].data = response.data.dataEV
        this.chartData4.labels = response.data.labelsEV
        this.chartData5.datasets[0].data = response.data.dataDefault
        this.chartData5.labels = response.data.labelsDefault

        this.loaded=true
        //this.listDevices = response.data;
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            console.log("error");
            break;
        }
      });
    },
    async llamada2(){
      //Consulta los datos para graficar;
    let url = process.env.VUE_APP_API_URL + "graphSelected";
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data)
        this.title = response.data.nameDevice;
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            console.log("error");
            break;
        }
      });
    },

    async comeBack() {
      //switch to the other layout
      this.$router.push({ name: "scheduling" });
    },

  }


  
};
</script>

<style lang="scss" scoped></style>
