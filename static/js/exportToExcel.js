// import the converted data from calendar.js
import { parsedBirdDataPromise } from "./calendar.js";
let dataToExcel = parsedBirdDataPromise;
parsedBirdDataPromise.then((data) => {
  // const trainerInfoElement = document.getElementById(`trainer-info${data.id}`);
  // const trainerInfo = trainerInfoElement.dataset.trainerInfo;
  // Map the data to include readable labels for training, weather, and motivation
  const formattedData = data.map((entry) => ({
    Date: entry.date.slice(0, 10),
    Trainer: entry.trainer || "unknown",
    Name: entry.name || "--",
    Type: entry.type || "--",
    Birth_Date: entry.birthDate || "--", 
    Gender: entry.sex || "Unknown",
    Target_weight: entry.target_weight || "unknown",
    Bird_Weight: entry.weight || "unknown",
    Food_Type: entry.food_type || "unknown",
    Food_Weight: entry.food_weight || "unknown",
    Food_Time: entry.food_time || "unknown",
    Training: entry.training || "Unknown",
    Training_Motivation: entry.training_motivation || "--",
    Weather: entry.weather || "Unknown",
    Behaviour: entry.behaviour || "Unknown",
    Training_time: entry.training_time || "--",
    Weather: entry.weather || "--",
    Temperature: entry.temperature || "--",
    Training_time: entry.training_time || "--",
    Notable_info: entry.notable_info || "--",

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
