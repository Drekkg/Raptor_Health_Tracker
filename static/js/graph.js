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
let pointColor = "green";
const range = 233;

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


console.log(yValuesEdited)


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
            backgroundColor: "rgba(3, 3, 246, 0.2)",
            borderColor: "rgba(0,0,25,1.0)",
            borderWidth: 2,
            data: yValuesEdited,
            pointBackgroundColor: function (context) {
              const value = context.raw; // Get the value of the point
              return value < range ? "red" : "green"; // Red if under threshold, green if over
            },
            // fill: true, // Fill the area under the line
          },
        ],
      },
      options: {
        responsive: true, // Make the chart responsive
        elements :{
           point:{
            radius: 10,
            hitRadius: 10,
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
              titleFont: {
                size: 28, // Font size for the tooltip title
                weight: "bold", // Font weight for the tooltip title
                family: "Arial", // Font family for the tooltip title
              },
              bodyFont: {
                size: 22, // Font size for the tooltip body
                weight: "normal", // Font weight for the tooltip body
                family: "Verdana", // Font family for the tooltip body
              },
              titleColor: "white", // Tooltip title color
              bodyColor: "yellow",
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: true, // Show grid lines on the X-axis
              color: "rgba(10, 10, 10, 0.5)"
              
            },
          ticks: {
              color: "rgb(23, 23, 23)", // Change the label color for the X-axis
              font: {
              size: 14, // Change the font size of the labels
              weight: "bold", // Make the labels bold
              },
            },
            max: 7,
            title: {
              display: true,
              text: "Date of Training",
              color: "rgb(61, 58, 130)",
              backgroundColor: "black",
              font: {
                size: 16, // Font size for the Y-axis title
                weight: "bold", // Font weight for the Y-axis title
                family: "Arial", // Font family for the Y-axis title
              },
            },
        
          },
          y: {
            grid: {
              display: true, // Show grid lines on the X-axis
              color: "rgba(46, 43, 43, 0.5)"
              
            },
            ticks: {
              color: "rgb(90, 73, 100)", // Change the label color for the X-axis
              font: {
                size: 14, // Change the font size of the labels
                weight: "bold", // Make the labels bold
              },
            },
            max: yScaleMax[0] + 30,
            min: yScaleMin[0] - 30,
            title: {
              display: true,
              text: "Weight in grams",
              color: "rgb(61, 58, 130)", // Change the color of the Y-axis title
              font: {
                size: 16, // Font size for the Y-axis title
                weight: "bold", // Font weight for the Y-axis title
                family: "Arial", // Font family for the Y-axis title
              },
            },
            // beginAtZero: true, // Start the Y-axis at 0
            
          },
        },
      },
    });
  }
  
});
