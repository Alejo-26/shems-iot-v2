<template>
  <div>
    <h2 style="text-align: center; margin-bottom: 2em">Market</h2>

    <div v-if="optionGraph==='energySold'">
        <bar-line v-if="loaded" :chartData="chartData" :options="options" />
    </div>

    <div v-if="optionGraph==='energyBought'">
      <bar-line v-if="loaded" :chartData="chartData2" :options="options" />
    </div>




    <div style="text-align:center;margin-top:20px">
        <button style="background-color: #95cafe;margin-right:30px" @click="changeGraph('energySold')">Energy Sold</button>
        <button style="background-color: #95cafe;" @click="changeGraph('energyBought')">Energy Bought</button>
    </div>


  </div>
  
</template>

<script>
/* eslint-disable */
import LineGraphic from "../components/LineChart.vue";
import axios from "axios";

export default {
  
  async mounted() {
    //Consulta los datos para graficar;
    let url = process.env.VUE_APP_API_URL + "community";
    await axios
      .get(url)
      .then((response) => {
        this.chartData.datasets[0].data = response.data.dataWeek
        this.chartData.labels = response.data.labelsWeek
        this.chartData2.datasets[0].data = response.data.dataHour
        this.chartData2.labels = response.data.labelsHour

        this.loaded=true
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
      optionGraph:"energySold",
      loaded:false,
      loaded2:false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Energy trade",
            borderWidth: 1,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            pointBorderColor: "#2554FF",
            data: []
          },
        ],
      },
      chartData2: {
        labels: [],
        datasets: [
          {
            label: "Line Chart",
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
      this.loaded=false
      console.log(timeInterval)
      this.optionGraph = timeInterval;
      this.updateData();
    },
    async updateData() {
    //we update the data for the graph;
    let url = process.env.VUE_APP_API_URL + "community";
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
  },
  
};
</script>

<style lang="scss" scoped></style>
