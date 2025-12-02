import { parsedBirdDataPromise } from "./calendar.js";
const yScaleMin = [];
const yScaleMax = [];
const xValues = [];
const yValues = [];
let xValuesEdited = [];
let yValuesEdited = [];
let startDate = null;
let endDate = null;
let setDate = 0;
let myChartInstance = null;

parsedBirdDataPromise.then((parsedBirdData) => {
  parsedBirdData.forEach((dateArray) => {
    xValues.push(dateArray.date.slice(0, 10));
    yValues.push(dateArray.weight);
    yScaleMax.push(dateArray.weight);
    yScaleMin.push(dateArray.weight);
  });
  xValues.reverse();
  yValues.reverse();
  yScaleMax.sort((a, b) => b - a);
  yScaleMin.sort((a, b) => a - b);

  startDate = xValues.length - setDate - 7;
  endDate = xValues.length - setDate;
  xValuesEdited = xValues.slice(startDate, endDate);
  yValuesEdited = yValues.slice(startDate, endDate);

  chart();

  document.getElementById("dateBack").addEventListener("click", () => {
    if (setDate >= 0) {
      setDate++;
      startDate = xValues.length - setDate - 7;
      endDate = xValues.length - setDate;
      xValuesEdited = xValues.slice(startDate, endDate);
      yValuesEdited = yValues.slice(startDate, endDate);
      if (xValuesEdited.length < 7) {
        if(!document.querySelector(".no-more-data")){
        const message = document.createElement("div"); 
        message.textContent = "No More Data";
        message.classList.add("alert", "alert-warning", "no-more-data");
        document.getElementById("myChart").parentNode.appendChild(message); 
        }
        setDate -= 1;
        return;
      } 
      chart();
    } else {
      return;
    }
  });

  document.getElementById("dateForward").addEventListener("click", () => {
    if (setDate > 0) {
        const noMoreDataElement = document.querySelector(".no-more-data");
        if (noMoreDataElement) {
          noMoreDataElement.remove(); 
      }
      setDate--;
      startDate = xValues.length - setDate - 7;
      endDate = xValues.length - setDate;
      xValuesEdited = xValues.slice(startDate, endDate);
      yValuesEdited = yValues.slice(startDate, endDate);
      chart();
    } else {
      return;
    }
  });

  function chart() {
    if (myChartInstance) {
      myChartInstance.destroy();
    }

    myChartInstance = new Chart("myChart", {
      type: "line",
      data: {
        labels: xValuesEdited,
        datasets: [
          {
            label: "Bird Weight Over Time",
            backgroundColor: "rgba(0,0,255,0.2)",
            borderColor: "rgba(0,0,255,1.0)",
            borderWidth: 2,
            data: yValuesEdited,
            // fill: true, // Fill the area under the line
          },
        ],
      },
      options: {
        // responsive: true, // Make the chart responsive
        elements :{
           point:{
            radius: 10,
           }
        },
        plugins: {
          legend: {
            display: true, // Show the legend
            position: "top", // Position the legend at the top
          },
          tooltip: {
            enabled: true, // Enable tooltips
            callbacks: {
              label: function (context) {
                return `Weight: ${context.raw}g`;
              },
            },
          },
        },
        scales: {
          x: {
            max: 7,
            title: {
              display: true,
              text: "Date of Training",
            },
            grid: {
              display: true, // Show grid lines on the X-axis
            },
          },
          y: {
            max: yScaleMax[0] + 30,
            min: yScaleMin[0] - 30,
            title: {
              display: true,
              text: "Weight in grams",
            },
            // beginAtZero: true, // Start the Y-axis at 0
            grid: {
              display: true, // Show grid lines on the Y-axis
            },
          },
        },
      },
    });
  }
});
