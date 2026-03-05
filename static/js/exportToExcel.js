// import the converted data from calendar.js
import { parsedBirdDataPromise } from "./calendar.js";
let dataToExcel;
// const trainerInfoElement = document.getElementById("trainer-info");
// const trainerInfo = trainerInfoElement.dataset.trainerInfo;
// console.log(trainerInfo);

let behaviourChoices = {
  0: "Motivated",
  1: "Lethargic",
  2: "Aggressive",
  3: "Unmotivated",
  4: "Slightly Unmotivated",
  5: "Neutral",
};

let trainingChoices = { 0: "No Training", 1: "Faustappel", 2: "Free Flight", 3: "Lure Flying", 4: "Hunting" };

let weatherChoices = { 0: "Rainy", 1: "Sunny", 2: "Windy", 3: "Cold", 4: "--" };
// Wait for the promise to resolve and export the data
parsedBirdDataPromise.then((data) => {
  // Map the data to include readable labels for training, weather, and motivation
  const formattedData = data.map((entry) => ({
    Date: entry.date.slice(0, 10),
    // Trainer: trainerInfo || "unknown",
    Target_weight: entry.target_weight || "unknown",
    Bird_Weight: entry.weight || "unknown",
    Food_Type: entry.food_type || "unknown",
    Food_Weight: entry.food_weight || "unknown",
    Training: trainingChoices[entry.training] || "Unknown",
    Weather: weatherChoices[entry.weather] || "Unknown",
    Motivation: behaviourChoices[entry.motivation] || "Unknown",
  }));
  dataToExcel = formattedData;
});

document.addEventListener("DOMContentLoaded", () => {
  // Add event listener to the export button
  document.getElementById("exportExcel").addEventListener("click", () => {
    exportToExcel(dataToExcel, "BirdData");
  });
});

// Function to export data to Excel
function exportToExcel(data, fileName) {
  // Convert the data into a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Export the workbook to an Excel file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}
