
//create variables to hold the bird data
  let birdDataGlobal = null;
  let birdDataGlobalParsed = null;
  let targetDate = [];




//Get the data using the json_script -  selected_bird_json|json_script:"selected_bird_data" 
document.addEventListener('DOMContentLoaded', () => {
  const fetchedBirdDataStr = document.getElementById('selected_bird_data').textContent;
  console.log(fetchedBirdDataStr);

//use JSON.parse to turn it into an object for java script
  try {
    const fetchedBirdData = JSON.parse(fetchedBirdDataStr);
    birdDataGlobal = fetchedBirdData;
    
  
  } catch (error) {
    console.error("JSON Parsing Error:", error.message);
    console.log("Raw JSON String:", fetchedBirdDataStr);
  }
  
});
//add and parse the data again 
document.addEventListener('DOMContentLoaded', () => {
  if(birdDataGlobal){
  birdDataGlobalParsed = JSON.parse(birdDataGlobal);
  console.log("birdglobal 1 + 2", birdDataGlobalParsed)
  birdDataGlobalParsed.forEach((trainingData) => {
  if(trainingData.training) {
    targetDate.push(trainingData.date.slice(0, 10));
  }

})
  }
})

// initiate and display the calendar
   document.addEventListener('DOMContentLoaded', () => {
        const { Calendar } = window.VanillaCalendarPro;

        const calendar = new Calendar('#calendar', {
            onCreateDateEls(self, dateEl) {
                const btnEl = dateEl.querySelector('[data-vc-date-btn]');
                if (!btnEl) return;
            
                // Get the full date of the current button
                const fullDate = dateEl.getAttribute('data-vc-date');
          
                // Target a specific date (e.g., "2025-11-11" to aplly styles if training has occurred               
                targetDate.forEach((targetDate) => {
                if (fullDate === targetDate) {
                    // Apply custom styles to the specific date
                    btnEl.style.backgroundColor = 'green'; // Set background color
                    btnEl.style.color = '#FFFFFF'; // Set text color
                    btnEl.style.borderRadius = '10%'; // Make it circular
                    btnEl.style.fontWeight = 'bold'; // Make the text bold
                }
              })
            },
        });

        calendar.init();
    });


