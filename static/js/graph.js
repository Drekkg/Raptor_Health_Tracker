// import the converted data from calendar.js
import { parsedBirdDataPromise } from "./calendar.js";

const birdInfoElement = document.getElementById("bird-info");
const targetWeight = parseInt(birdInfoElement.dataset.targetWeight);
// create arrays to hold the data for the chart axes
const yScaleMin = [targetWeight - (targetWeight * 1.10 - targetWeight)];
const yScaleMax = [Math.round(targetWeight * 1.10)];
const xValues = [];
const yValues = [];
let xValuesEdited = [];
let yValuesEdited = [];
let startDate = null;
let endDate = null;
let setDate = 0;
let myWeightChartInstance;
let weightPercentages = [];
 // Shared array to store calculated percentages

// iterate over incoming data and add the applicable data to the array eg weight of bird and date
parsedBirdDataPromise.then((parsedBirdData) => {
  parsedBirdData.forEach((dateArray) => {
    xValues.push(dateArray.date.slice(0, 10));
    yValues.push(dateArray.weight);
    //add the weight to arrays
    yScaleMax.push(dateArray.weight);
    yScaleMin.push(dateArray.weight);
  });
  xValues.reverse();
  yValues.reverse();

  // for the y scale we want the range 30g over and 30g under the highest and lowest data point(weight)
  //we use sort to arrange the arrays: high => low and low => high. the scale is set in the Y scale options of the create Chart method
  yScaleMax.sort((a, b) => b - a);
  yScaleMin.sort((a, b) => a - b);
  // For the x axis we only want to display 7 dates, we slice the arrays accordingly and the arrays
  //setDate is initially set to zero

  //startDate is set to the index of the last 7 elements of the date array
  startDate = xValues.length - setDate - 7;
  //endDate is set to the index of the last element of the array
  endDate = xValues.length - setDate;

  //we slice the arrays x for the date and y for the corresponding weight
  xValuesEdited = xValues.slice(startDate, endDate);
  yValuesEdited = yValues.slice(startDate, endDate);

  
  let targetWeightElement = document.getElementById("bird-info");
  const targetWeight = targetWeightElement.dataset.targetWeight; 
 


  chart();
  
  

  //set the display date and weight range back by one day
  document.getElementById("dateBack").addEventListener("click", () => {
    if (setDate >= 0) {
      setDate++;
      startDate = xValues.length - setDate - 7;
      endDate = xValues.length - setDate;
      xValuesEdited = xValues.slice(startDate, endDate);
      yValuesEdited = yValues.slice(startDate, endDate);
      //display an alert if there is no more data on the  last day
      if (xValuesEdited.length < 7) {
        if (!document.querySelector(".no-more-data")) {
          const message = document.createElement("div");
          message.textContent = "End of Data";
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

  //set the display date and weight range forward by one day
  document.getElementById("dateForward").addEventListener("click", () => {
    //check to see if the no more data alert is visible/created and remove it from the dom if it is
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
  // Plugin to draw a horizontal line for the target weight
const targetWeightLinePlugin = {
  id: "targetWeightLine",
  beforeDraw: (chart) => {
      

      // Check if targetWeight is valid
      if (isNaN(targetWeight)) {
          console.error("Invalid target weight");
          return;
      }

      const ctx = chart.ctx;
      const yScale = chart.scales["y"];
      const xScale = chart.scales["x"];

      // Get the y-coordinate for the target weight
      const yValue = yScale.getPixelForValue(targetWeight);

      // Draw the horizontal line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(xScale.left, yValue); // Start at the left edge
      ctx.lineTo(xScale.right, yValue); // Draw to the right edge
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red"; // Line color
      ctx.stroke();
      ctx.restore();

      // Add a label for the target weight
      ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.fillText(`Target Weight: ${targetWeight}g`, xScale.right - 150, yValue - 5);
  },
};

Chart.register(targetWeightLinePlugin);

  //function to call the Chart method
  function chart() {
    //check to see if the chart has been created and remove it and re draw it to update it
    if (myWeightChartInstance) {
      myWeightChartInstance.destroy();
    }
    myWeightChartInstance = new Chart("myChart", {
      type: "line",
      data: {
        labels: xValuesEdited,
        datasets: [
          {
            label: "Bird Weight Over Time",
            backgroundColor: "rgba(3, 3, 246, 0.09)",
            borderColor: "rgba(0,0,25,1.0)",
            borderWidth: 2,
            data: yValuesEdited,
            pointBackgroundColor: function (context) {
              // const range = context.raw; // Get the value of the point
              let range = context.raw;
              //get the value of the prev days bird weight
              let prevBirdWeight = yValuesEdited[context.dataIndex - 1];

              //get the difference between current weight and prv weight
              let weightDiff = range - prevBirdWeight;
              //get the diff in percent
              let weightPercent = (weightDiff / range) * 100;
              //rounded off
              let weightPercentRounded = Math.round(weightPercent);
              // Store the calculated percentage in the shared array
              weightPercentages[context.dataIndex] = weightPercentRounded;
              // return red and turn the point red if weight diff is over 3%
              return weightPercentRounded < -3 || weightPercentRounded > 3 ? "red" : "green"; // Red if under threshold, green if over
            },
            fill: true, // Fill the area under the line
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        // responsive: true, // Make the chart responsive
        elements: {
          point: {
            radius: 5,
            hitRadius: 10,
          },
        },
        plugins: {
          legend: {
            display: true, // Show the legend
            position: "top", // Position the legend at the top
          },
          tooltip: {
            enabled: true,
            padding: 20, // Enable tooltips
            titleFont: {
              size: 20, // Font size for the tooltip title
              weight: "bold", // Font weight for the tooltip title
              family: "Arial", // Font family for the tooltip title
            },
            bodyFont: {
              size: 18, // Font size for the tooltip body
              weight: "normal", // Font weight for the tooltip body
              family: "Verdana", // Font family for the tooltip body
            },
            callbacks: {
              label: function (context) {
                // Retrieve the pre-calculated percentage from the shared array
                let weightPercentRounded = weightPercentages[context.dataIndex];
                if (weightPercentRounded !== null && !isNaN(weightPercentRounded)) {
                  return `Weight: ${context.raw}g, Percentage: ${weightPercentRounded}%`;
                } else {
                  return `Weight: ${context.raw}g, Percentage: -- %`;
                }
              },
            },
            titleColor: "aliceblue", // Tooltip title color
            bodyColor: "white",
          },
        },
        scales: {
          x: {
            grid: {
              display: true, // Show grid lines on the X-axis
              color: "rgba(10, 10, 10, 0.5)",
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
              color: "rgba(46, 43, 43, 0.5)",
            },
            ticks: {
              color: "rgb(90, 73, 100)", // Change the label color for the X-axis
              font: {
                size: 14, // Change the font size of the labels
                weight: "bold", // Make the labels bold
              },
            },
            //set the yscale max and min choosing the first element of the sorted arrays
            //yScaleMax is the highest yScaleMin the lowest + 30g

            max: yScaleMax[0] + 30,
            min: yScaleMin[0] - 30 > 0 ? yScaleMin[0] - 30 : 0,
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
