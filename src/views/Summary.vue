<template>
  <div>
    <h2 style="text-align: center; margin-bottom: 2em">Summary</h2>
    
    
    <div v-if="optionGraph==='day'">
      <bar-line v-if="loaded" :chartData="chartData2" :options="options" />
    </div>

    <div v-if="optionGraph==='week'">
      <bar-line2 v-if="loaded" :chartData="chartData" :options="options" />
    </div>

    <div style="text-align:center;margin-top:20px">
      <button style="background-color: #95cafe;margin-right:30px" @click="changeGraph('day')">Day</button>
      <button style="background-color: #95cafe;" @click="changeGraph('week')">Week</button>
    </div>
    
    <!-- <h2>{{this.chartData.datasets.data}}</h2> -->
  </div>
</template>

<script>
/* eslint-disable */
import BartGraphic from "../components/BarChart.vue";
import BartGraphic2 from "../components/BarChart2.vue";
import axios from "axios";

export default {
  
  async mounted() {
    //Consulta los datos para graficar;
    let url = process.env.VUE_APP_API_URL + "summary";
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data)
        this.chartData.datasets[0].data = response.data.dataWeek
        this.chartData.labels = response.data.labelsWeek
        this.chartData2.datasets[0].data = response.data.dataHour
        this.chartData2.labels = response.data.labelsHour

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
  data() {
    //vue-chart.vue
    return {
      optionGraph:"day",
      loaded:false,
      loaded2:false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Consumption in khW",
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
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
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
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
    "bar-line": BartGraphic,
    "bar-line2": BartGraphic2,
  },
  methods:{
    changeGraph(timeInterval) {
      console.log(timeInterval)
      this.optionGraph = timeInterval;
    },
  }
};
</script>

<style lang="scss" scoped></style>
