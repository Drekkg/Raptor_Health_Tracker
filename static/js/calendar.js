//create variables to hold the bird data
let birdDataGlobal = null;
let birdDataDailyMapped = [];
let targetDate = [];
let targetDateNoTraining = [];
let dateCalendarInfo = null;

//create map tables to convert the integers stored in the DB into strings
let trainingChoices = {
  0: "No Training",
  1: "Faustappel",
  2: "Free Flight",
  3: "Lure Flying",
  4: "Hunting",
};
let weatherChoices = { 0: "Rainy", 1: "Sunny", 2: "Windy", 3: "Cold", 4: "--" };
let behaviourChoices = {
  0: "Motivated",
  1: "Lethargic",
  2: "Aggressive",
  3: "Unmotivated",
  4: "Slightly Unmotivated",
  5: "Neutral",
};
//get the user permissions
const userPermissions = document.getElementById("edit-permission");
const userPermissionsData = userPermissions.getAttribute("data-user-permission");

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

  if (birdDataGlobal) {
    birdDataGlobal.forEach((trainingData) => {
      if (trainingData.training) {
        targetDate.push(trainingData.date.slice(0, 10));
      } else if (trainingData.food_type && !trainingData.training) {
        targetDateNoTraining.push(trainingData.date.slice(0, 10));
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  birdDataDailyMapped = birdDataGlobal.map((selectedDailyData) => {
    return {
      ...selectedDailyData,
      behaviour: behaviourChoices[selectedDailyData.behaviour] || "--",
      weather: weatherChoices[selectedDailyData.weather] || "--",
      training: trainingChoices[selectedDailyData.training] || "--",
      date: selectedDailyData.date.slice(0, 10) || "--",
    };
  });
});

export const parsedBirdDataPromise = new Promise((resolve, reject) => {
  document.addEventListener("DOMContentLoaded", () => {
    try {
      // Resolve the promise with the parsed data
      resolve(birdDataGlobal);
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
    const matchingData = birdDataGlobal.filter(
      (selectedDate) => selectedDate.date.slice(0, 10) === dateCalendarInfo
    );

    // Generate the HTML content for all matching data
    let modalContent = `<p><strong>Date:</strong> ${dateCalendarInfo}</p>`;
    matchingData.forEach((selectedDate) => {
      let editDailyDataUrl = "";
      let editButtonHTML = "";

      if (userPermissionsData === "true") {
        editButtonHTML = `
             <li class="li-style d-grid">
                <a
                  class="btn btn-edit-data"
                  aria-current="page"
                  href="/daily_data_edit/${selectedDate.id}"
                  >Edit Daily Data</a
                >
              </li>
          `;
      } else {
        editButtonHTML = ``;
      }

      const trainerInfoElement = document.getElementById(`trainer-info${selectedDate.id}`);
      const trainerInfo = trainerInfoElement.dataset.trainerInfo;

      const imagePlaceholder = "http://res.cloudinary.com/du9ulpbic/image/upload/placeholder";
      const selectedDateNotableImage =
        selectedDate.notable_image === imagePlaceholder
          ? "No Image"
          : `<img src="${selectedDate.notable_image}"
      class="card-img-top"
      alt="Notable Image"
      id="notableImage">`;

      modalContent += `
        <hr>
        <p><strong>Trainer:</strong> ${trainerInfo}</p>
        <p><strong>Weight:</strong> ${selectedDate.weight}g</p>
        <p><strong>Training:</strong> ${trainingChoices[selectedDate.training]}</p>
        <p><strong>Motivation during Training:</strong> ${selectedDate.training_motivation}</p>
        <p><strong>Food Type:</strong> ${selectedDate.food_type}</p>
        <p><strong>Food Weight:</strong> ${selectedDate.food_weight}g</p>
        <p><strong>Weather:</strong> ${weatherChoices[selectedDate.weather]}</p>
        <p><strong>Temperature:</strong> ${selectedDate.temperature}°C</p>
        <p><strong>Behaviour:</strong> ${behaviourChoices[selectedDate.behaviour]}</p>
        <p><strong>Additional Info:</strong>${selectedDate.notable_info || "--"}</p>
        <p>${selectedDateNotableImage}</p>
         <div id="notableModal" class="modal-img">
            <span class="close" id="close">×</span>  
            <img class="modal-content" id="notable-modal-img">
            <div id="caption"></div>
          </div>
          <p>${editButtonHTML}</p>
      `;
    });

    // Display the content in the modal
    const modalBody = document.getElementById("calendarModalBody");
    modalBody.innerHTML = modalContent;

    // Trigger the Bootstrap modal
    const calendarModal = new bootstrap.Modal(document.getElementById("calendarModal"), {
      backdrop: false,
    });
    calendarModal.show();

    const modal = document.getElementById("notableModal");
    const notableModalImg = document.getElementById("notable-modal-img");
    const closeBtn = document.getElementById("close");

    // add event listeners to img elements to display in a modal

    const notableImage = document.getElementById("notableImage");
    if (notableImage) {
      notableImage.addEventListener("click", function (e) {
        if (e.target === notableImage) {
          modal.style.display = "block";
          notableModalImg.src = this.src;
          notableModalImg.alt = this.alt;
        }
      });
      closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
      });
    }
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
