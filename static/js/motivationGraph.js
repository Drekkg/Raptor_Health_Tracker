import { parsedBirdDataPromise } from "./calendar.js";
let myMotivationChart;



document.getElementById("birdMotivationChart").addEventListener("click", () => {
    motivationChart();
  })


    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];

  function motivationChart() {
    if (myMotivationChart) {
      myMotivationChart.destroy();
      }
      myMotivationChart = new Chart("motivationChart",
      {
        type: 'line',
        data: {
          labels: data.map(row => row.year),
          datasets: [
            {
             
              data: data.map(row => row.count),
              backgroundColor: 'rgba(3, 3, 246, 0.2)', // Blue with 20% opacity
                    borderColor: 'rgba(3, 3, 246, 0.8)', // Blue with 80% opacity
                    borderWidth: 2
            }
          ]
        }
      }
    );
  }