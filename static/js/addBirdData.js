//Javascript for the add daily data modal
const dataModal = new bootstrap.Modal(document.getElementById("addDataModal"));
const dataButtons = document.getElementsByClassName("btn-add-data");
const dataConfirm = document.getElementById("addDataConfirm");
const buttons = document.querySelectorAll(".motivation-btn");
const hiddenInput = document.getElementById("trainingMotivationInput");

//clear local storage back to birdlist button click

document.getElementById("backToBirdListButton").addEventListener("click", () => {
  localStorage.setItem("motivation", "");
});

// motivation buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    buttons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to the clicked button
    button.classList.add("active");
    hiddenInput.value = button.getAttribute("data-value");
    localStorage.setItem("motivation", hiddenInput.value);
  });
});

// Check if localStorage is available and if "motivation" exists
if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
  localStorage.setItem("motivation", "");
}

if (localStorage) {
  if (!localStorage.getItem("motivation")) {
    localStorage.setItem("motivation", "");
  }
  hiddenInput.value = localStorage.getItem("motivation");
  let selectedButton = document.querySelector(`[data-value="${hiddenInput.value}"]`);

  if (selectedButton) {
    selectedButton.classList.add("active");
  }
}

const trainingField = document.querySelector("[name='training']");
const trainingMotivationSection = document.querySelectorAll(".hideForm");

trainingField.addEventListener("change", () => {
  if (trainingField.value !== "0") {
    trainingMotivationSection.forEach((section) => {
      section.classList.remove("hideForm");
      section.classList.add("showForm");
    });
  } else {
    trainingMotivationSection.forEach((section) => {
      section.classList.remove("showForm");
      section.classList.add("hideForm");
      hiddenInput.value = "";
    });
  }
});

if (trainingField.value !== "0") {
  trainingMotivationSection.forEach((section) => {
    section.classList.remove("hideForm");
    section.classList.add("showForm");
  });
}

//add and wire up the buttons
for (let button of dataButtons) {
  button.addEventListener("click", (e) => {
    event.preventDefault();
    dataModal.show();
  });
}

document.getElementById("submitButton").addEventListener("click", () => {
  const submitButton = document.getElementById("submitButton");
  submitButton.disabled = true; // Disable the button
  submitButton.innerText = "Submitting..."; // Optional: Change the button text
  // Ensure the form is submitted
  document.getElementById("DailyDataForm").submit();
});
