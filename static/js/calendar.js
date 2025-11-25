//create variables to hold the bird data
let birdDataGlobal = null;
let birdDataGlobalParsed = null;
let targetDate = [];
let targetDateNoTraining = [];
let dateCalendarInfo = null;
let traingChoices = { 0: "No Training", 1: "Faustappel", 2: "Free Flight", 3: "Feather Play" };

//Get the data using the json_script -  selected_bird_json|json_script:"selected_bird_data"
document.addEventListener("DOMContentLoaded", () => {
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

document.addEventListener("DOMContentLoaded", () => {
  
  function displayTrainingCalendar(dateCalendarInfo) {
    birdDataGlobalParsed.forEach((selectedDate) => {
      if (selectedDate.date.slice(0, 10) === dateCalendarInfo) {
        console.log(birdDataGlobalParsed)
        const modalBody = document.getElementById("calendarModalBody");
      modalBody.innerHTML = `
        <p><strong>Date:</strong>  ${dateCalendarInfo}</p>
        <p><strong>Weight:</strong>  ${selectedDate.weight}g</p>
        <p><strong>Training:</strong>  ${traingChoices[selectedDate.training]}</p>
        <p><strong>Food Type:</strong>  ${selectedDate.food_type }</p>
        <p><strong>Food Type:</strong>  ${selectedDate.food_weight}g</p>
        <p><strong>Additional Info:</strong> ${selectedDate.notable_info || "None"}</p>
      `;
         // Trigger the Bootstrap modal
      const calendarModal = new bootstrap.Modal(document.getElementById("calendarModal"));
      calendarModal.show();
      }
    });
  }
  const { Calendar } = window.VanillaCalendarPro;
  // Calendar options
  const options = {
    selectedTheme: "light",
    onClickDate(self) {
      let clickedDate = self.context.selectedDates;
      targetDate.forEach((date) => {
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
