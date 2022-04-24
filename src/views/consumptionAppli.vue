<template>
  <div>
    <h2 style="text-align: center; margin-bottom: 2em">{{title}}</h2>
    
    
    <div v-if="title==='Oven'">
      <bar-line v-if="loaded" :chartData="chartData2" :options="options" />
    </div>

    <div v-if="title==='Washing machine'">
      <bar-line v-if="loaded" :chartData="chartData" :options="options" />
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
      optionGraph:"day",
      title:"",
      loaded:false,
      loaded2:false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Appliance Consumption",
            borderWidth: 1,
            fill: false,
            backgroundColor: '#95cafe',
            pointBorderColor: "#2554FF",
            data: []
          },
        ],
      },
      chartData2: {
        labels: [],
        datasets: [
          {
            label: "Consumption in khW",
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
    changeGraph(timeInterval) {
      console.log(timeInterval)
      this.optionGraph = timeInterval;
    },
    async llamada1(){
      //Consulta los datos para graficar;
    let url = process.env.VUE_APP_API_URL + "consumption-appli";
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data)
        this.chartData.datasets[0].data = response.data.dataWashing
        this.chartData.labels = response.data.labelsWashing
        this.chartData2.datasets[0].data = response.data.dataDefault
        this.chartData2.labels = response.data.labelsDefault

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
