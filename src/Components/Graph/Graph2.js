import React from "react";
import Chart from "react-apexcharts";

function SecondGraph() {
    var obj = {
        series: [{
            data: [0, 40, 0]
          }],
          options: {
                colors:["#FEE266"],
            grid: {
                show:false
              },
            dataLabels: {
                enabled: false
              },
            chart: {
              zoom:{
                enabled:false
              }
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              categories: ["5am","1pm","6pm"]
            },
            yaxis:{
                show:false
              },
          },
        };    
    return (
      <div className="LowerGraph1">
        <div className="LowerGraph2">
          <div className="LowerGraph3">
            <Chart
              options={obj.options}
              series={obj.series}
              type="area"
              width="100%"
              height={190}
            />
          </div>
        </div>
      </div>
    );
  }
export default SecondGraph;