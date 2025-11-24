
//create variables to hold the bird data
  let birdDataGlobal = null;
  let birdDataGlobalParsed = null;
  let targetDate = [];
  let targetDateNoTraining = [];


//Get the data using the json_script -  selected_bird_json|json_script:"selected_bird_data" 
document.addEventListener('DOMContentLoaded', () => {
  const fetchedBirdDataStr = document.getElementById('selected_bird_data').textContent;

//use JSON.parse to turn it into an object for java script
  try {
    const fetchedBirdData = JSON.parse(fetchedBirdDataStr);
    birdDataGlobal = fetchedBirdData;
    
  
  } catch (error) {
    console.error("JSON Parsing Error:", error.message);
  }
  
});
//add and parse the data again 
document.addEventListener('DOMContentLoaded', () => {
  if(birdDataGlobal){
  birdDataGlobalParsed = JSON.parse(birdDataGlobal);
  console.log(birdDataGlobalParsed);
  birdDataGlobalParsed.forEach((trainingData) => {
  if(trainingData.training) {
    targetDate.push(trainingData.date.slice(0, 10));
  } else if 
    (trainingData.food_type && !trainingData.training) {
    targetDateNoTraining.push(trainingData.date.slice(0, 10));
    }
  

})
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const { Calendar } = window.VanillaCalendarPro;

  // Calendar options
  const options = {
      selectedTheme: 'light',
      onCreateDateEls(self, dateEl) {
          const btnEl = dateEl.querySelector('[data-vc-date-btn]');
          if (!btnEl) return;

          // Get the full date of the current button
          const fullDate = dateEl.getAttribute('data-vc-date');

          // Apply styles to specific dates with training
          targetDate.forEach((targetDate) => {
              if (fullDate === targetDate) {
                  btnEl.style.backgroundColor = 'green'; 
                  btnEl.style.color = '#FFFFFF'; 
                  btnEl.style.borderRadius = '10%'; 
                  btnEl.style.fontWeight = 'bold'; 
              } 
          });
          // Apply styles to specific dates with no training 
          targetDateNoTraining.forEach((targetDate) => {
            if (fullDate === targetDate) {
                btnEl.style.backgroundColor = 'orange'; 
                btnEl.style.color = '#FFFFFF'; 
                btnEl.style.borderRadius = '10%'; 
                btnEl.style.fontWeight = 'bold'; 
            } 
        });
      },
  };

  // Initialize the calendar
  const calendar = new Calendar('#calendar', options);
  calendar.init();
});
