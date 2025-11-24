
//create variables to hold the bird data
  let birdDataGlobal = null;
  let birdDataGlobalParsed = null;
  let targetDate = [];


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
  birdDataGlobalParsed.forEach((trainingData) => {
  if(trainingData.training) {
    targetDate.push(trainingData.date.slice(0, 10));
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

          // Apply styles to specific dates
          targetDate.forEach((targetDate) => {
              if (fullDate === targetDate) {
                  btnEl.style.backgroundColor = 'green'; // Set background color
                  btnEl.style.color = '#FFFFFF'; // Set text color
                  btnEl.style.borderRadius = '10%'; // Make it circular
                  btnEl.style.fontWeight = 'bold'; // Make the text bold
              }
          });
      },
  };

  // Initialize the calendar
  const calendar = new Calendar('#calendar', options);
  calendar.init();
});
