//Javascript for the add daily data modal
const dataModal = new bootstrap.Modal(document.getElementById("addDataModal"));
const dataButtons = document.getElementsByClassName("btn-add-data");
const dataConfirm = document.getElementById("addDataConfirm");

  const buttons = document.querySelectorAll(".motivation-btn");
  const hiddenInput = document.getElementById("trainingMotivationInput");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      buttons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to the clicked button
      button.classList.add("active");
      hiddenInput.value = button.getAttribute("data-value");
      
    });
  });

const trainingField = document.querySelector("[name='training']");
const trainingMotivationSection = document.querySelector(".hideForm");

trainingField.addEventListener("change", () => {
  if(trainingField.value !== "0" ) {
  trainingMotivationSection.classList.remove("hideForm");
  trainingMotivationSection.classList.add("showForm");
  } else {
  trainingMotivationSection.classList.remove("showForm");
  trainingMotivationSection.classList.add("hideForm");
  hiddenInput.value = "";
  }
});

if(trainingField.value !== "0" ) {
  trainingMotivationSection.classList.remove("hideForm");
  trainingMotivationSection.classList.add("showForm");
};


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
