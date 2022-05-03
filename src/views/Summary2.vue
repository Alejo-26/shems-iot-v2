<template>
  <div>
    <h2 style="text-align: center; margin-bottom: 2em">Summary 2</h2>

    <div style="text-align:center;margin-top:20px;margin-bottom:20px">
      <button style="background-color: #95cafe;margin-right:30px" @click="changeObject('consumption')">Consumption</button>
      <button style="background-color: #95cafe;margin-right:30px" @click="changeObject('EV_battery')">EV_battery</button>
      <button style="background-color: #95cafe;margin-right:30px" @click="changeObject('ESS_battery')">ESS_battery</button>
    </div>
    
    <div v-if="optionGraph==='day'">
      <bar-line v-if="loaded" :chartData="chartData" :options="options" />
    </div>


    <div style="text-align:center;margin-top:20px">
      <button style="background-color: #95cafe;margin-right:30px" @click="changeGraph('day')">Day</button>
      <button v-if="object==='consumption'" style="background-color: #95cafe;margin-right:30px" @click="changeGraph('week')">Week</button>
      <button v-if="object==='consumption'" style="background-color: #95cafe;margin-right:30px" @click="changeGraph('month')">Month</button>
      <button v-if="object==='consumption'" style="background-color: #95cafe;" @click="changeGraph('year')">Year</button>
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
    let url = process.env.VUE_APP_API_URL + "summary2";
    await axios
      //.get(url)
      .get(url,{params:{period:'day',object:'consumption'}})
      .then((response) => {
        console.log(response.data)
        this.chartData.datasets[0].data = response.data.data
        this.chartData.labels = response.data.labels
        

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
      object:"consumption",
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
    //NEW PART ########################################
    changeObject(option) {
      this.loaded=false
      console.log(option);
      this.object = option;
      this.updateData()
    },
    async updateData() {
    //we update the data for the graph;
    let url = process.env.VUE_APP_API_URL + "summary2";
    await axios
      .get(url,{params:{period:this.optionGraph,object:this.object}})
      .then((response) => {
        console.log(response.data)
        this.chartData.datasets[0].data = response.data.data
        this.chartData.labels = response.data.labels
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
