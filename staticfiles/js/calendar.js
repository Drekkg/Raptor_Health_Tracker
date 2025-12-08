//create variables to hold the bird data
let birdDataGlobal = null;
let birdDataGlobalParsed = null;
let targetDate = [];
let targetDateNoTraining = [];
let dateCalendarInfo = null;
let traingChoices = { 0: "No Training", 1: "Faustappel", 2: "Free Flight", 3: "Lure Flying" };
let weatherChoices = {0: "Rainy", 1: "Sunny", 2: "Windy", 3: "Cold",
};
let behaviourChoices = {0: "Motivated", 1: "Lethargic", 2: "Aggressive", 3: "Unmotivated", 4: "Slightly Unmotivated", 5: "Neutral"
};

//Get the data using the json_script -  selected_bird_json|json_script:"selected_bird_data"
document.addEventListener("DOMContentLoaded", () => {
  console.log(document.getElementById("selected_bird_data"));
  const fetchedBirdDataStr = document.getElementById("selected_bird_data").textContent;

  //use JSON.parse to turn it into an object for java script
  try {
    const fetchedBirdData = JSON.parse(fetchedBirdDataStr);
    birdDataGlobal = fetchedBirdData;
  } catch (error) {
    console.error("JSON Parsing Error:", error.message);
  }
});
//add and parse the data again
document.addEventListener("DOMContentLoaded", () => {
  if (birdDataGlobal) {
    birdDataGlobalParsed = JSON.parse(birdDataGlobal);

    birdDataGlobalParsed.forEach((trainingData) => {
      if (trainingData.training) {
        targetDate.push(trainingData.date.slice(0, 10));
      } else if (trainingData.food_type && !trainingData.training) {
        targetDateNoTraining.push(trainingData.date.slice(0, 10));
      }
    });
  }
  
});


export const parsedBirdDataPromise = new Promise((resolve, reject) => {
  document.addEventListener("DOMContentLoaded", () => {
    try {
      // Resolve the promise with the parsed data
      resolve(birdDataGlobalParsed);
    } catch (error) {
      // Reject the promise if an error occurs
      reject(error);
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {

  function displayTrainingCalendar(dateCalendarInfo) {
    const time = null;
    // Filter all matching data for the selected date
    const matchingData = birdDataGlobalParsed.filter(
      (selectedDate) => selectedDate.date.slice(0, 10) === dateCalendarInfo,
    );
    console.log("Bird Data",birdDataGlobalParsed)
    // Generate the HTML content for all matching data
    let modalContent = `<p><strong>Date:</strong> ${dateCalendarInfo}</p>`;
    matchingData.forEach((selectedDate) => {
      modalContent += `
        <hr>
        <p><strong>Weight:</strong> ${selectedDate.weight}g</p>
        <p><strong>Training:</strong> ${traingChoices[selectedDate.training]}</p>
        <p><strong>Motivation during Training:</strong> ${selectedDate.training_motivation}</p>
        <p><strong>Food Type:</strong> ${selectedDate.food_type}</p>
        <p><strong>Food Weight:</strong> ${selectedDate.food_weight}g</p>
        <p><strong>Weather:</strong> ${weatherChoices[selectedDate.weather]}</p>
        <p><strong>Temperature:</strong> ${selectedDate.temperature}°C</p>
        <p><strong>Behaviour:</strong> ${behaviourChoices[selectedDate.behaviour]}</p>
        <p><strong>Additional Info:</strong> ${selectedDate.notable_info || "None"}</p>
      `;
    });

    // Display the content in the modal
    const modalBody = document.getElementById("calendarModalBody");
    modalBody.innerHTML = modalContent;

    // Trigger the Bootstrap modal
    const calendarModal = new bootstrap.Modal(document.getElementById("calendarModal"));
    calendarModal.show();
  }
  const { Calendar } = window.VanillaCalendarPro;
  //merge the two arrrays
  let allDatesWithData = targetDate.concat(targetDateNoTraining);
  const allDatesWithDataUnique = [...new Set(allDatesWithData)];
  
  // Calendar options
  const options = {
    selectedTheme: "light",
    onClickDate(self) {
      let clickedDate = self.context.selectedDates;
      allDatesWithDataUnique.forEach((date) => {
        if (clickedDate[0] === date) {
          dateCalendarInfo = date;
          displayTrainingCalendar(dateCalendarInfo);
        }
      });
    },
    onCreateDateEls(self, dateEl) {
      const btnEl = dateEl.querySelector("[data-vc-date-btn]");
      if (!btnEl) return;

      // Get the full date of the current button
      const fullDate = dateEl.getAttribute("data-vc-date");

      // Apply styles to specific dates with training
      targetDate.forEach((targetDate) => {
        if (fullDate === targetDate) {
          btnEl.style.backgroundColor = "green";
          btnEl.style.color = "#FFFFFF";
          btnEl.style.borderRadius = "10%";
          btnEl.style.fontWeight = "bold";
        }
      });
      // Apply styles to specific dates with no training
      targetDateNoTraining.forEach((targetDate) => {
        if (fullDate === targetDate) {
          btnEl.style.backgroundColor = "orange";
          btnEl.style.color = "#FFFFFF";
          btnEl.style.borderRadius = "10%";
          btnEl.style.fontWeight = "bold";
        }
      });
    },
  };

  // Initialize the calendar
  const calendar = new Calendar("#calendar", options);
  calendar.init();
});
