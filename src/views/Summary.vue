<template>
  <div>
    <h2 style="text-align: center; margin-bottom: 2em">Summary</h2>
    
    
    <div v-if="optionGraph==='day'">
      <bar-line v-if="loaded" :chartData="chartData2" :options="options" />
    </div>

    <div v-if="optionGraph==='week'">
      <bar-line v-if="loaded" :chartData="chartData" :options="options" />
    </div>

    <div v-if="optionGraph==='month'">
      <bar-line v-if="loaded" :chartData="chartData3" :options="options" />
    </div>

    <div v-if="optionGraph==='year'">
      <bar-line v-if="loaded" :chartData="chartData4" :options="options" />
    </div>

    <div style="text-align:center;margin-top:20px">
      <button style="background-color: #95cafe;margin-right:30px" @click="changeGraph('day')">Day</button>
      <button style="background-color: #95cafe;margin-right:30px" @click="changeGraph('week')">Week</button>
      <button style="background-color: #95cafe;margin-right:30px" @click="changeGraph('month')">Month</button>
      <button style="background-color: #95cafe;" @click="changeGraph('year')">Year</button>
    </div>

    <div style="margin:30px">
      <div id="detailsElem" style="background-color: #95cafe;text-align: center">
        <h2>9.6 kWh</h2>
        <p>Mean consumption</p>
      </div>
      <br>
      <div id="detailsElem" style="background-color: #95cafe;text-align: center">
        <h2>11.5 kWh</h2>
        <p>Maximum consumption</p>
      </div>
      <br>
      <div id="detailsElem" style="background-color: #95cafe;text-align: center">
        <h2>9.5 kWh</h2>
        <p>Minimum consumption</p>
      </div>
    </div>
    
    <!-- <h2>{{this.chartData.datasets.data}}</h2> -->
  </div>
</template>

<script>
/* eslint-disable */
import BartGraphic from "../components/BarChart.vue";
import axios from "axios";

export default {
  
  async mounted() {
    //Consulta los datos para graficar;
    let url = process.env.VUE_APP_API_URL + "summary";
    await axios
      //.get(url)
      .get(url,{params:{period:'day',object:'consumption'}})
      .then((response) => {
        console.log(response.data)
        this.chartData.datasets[0].data = response.data.dataWeek
        this.chartData.labels = response.data.labelsWeek
        this.chartData2.datasets[0].data = response.data.dataHour
        this.chartData2.labels = response.data.labelsHour
        this.chartData3.datasets[0].data = response.data.dataMonth
        this.chartData3.labels = response.data.labelsMonth
        this.chartData4.datasets[0].data = response.data.dataYear
        this.chartData4.labels = response.data.labelsYear

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
            label: "Consumption in kWh",
            borderWidth: 1,
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
            label: "Consumption in kWh",
            borderWidth: 1,
            backgroundColor: '#95cafe',
            pointBorderColor: "#2554FF",
            data: []
          },
        ],
      },
      chartData3: {
        labels: [],
        datasets: [
          {
            label: "Consumption in kWh",
            borderWidth: 1,
            backgroundColor: '#95cafe',
            pointBorderColor: "#2554FF",
            data: []
          },
        ],
      },
      chartData4: {
        labels: [],
        datasets: [
          {
            label: "Consumption in kWh",
            borderWidth: 1,
            backgroundColor: '#95cafe',
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
  },
  methods:{
    changeGraph(timeInterval) {
      this.loaded=false
      console.log(timeInterval);
      this.optionGraph = timeInterval;
      this.updateData()
    },
    async updateData() {
    //we update the data for the graph;
    let url = process.env.VUE_APP_API_URL + "summary";
    await axios
      .get(url,{params:{period:'day',object:'consumption'}})
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
  }
};
</script>

<style lang="scss" scoped></style>
