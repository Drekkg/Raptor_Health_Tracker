//Javascript for the add daily data modal
const dataModal = new bootstrap.Modal(document.getElementById("addDataModal"));
const dataButtons = document.getElementsByClassName("btn-add-data");
const dataConfirm = document.getElementById("addDataConfirm");



//add and wire up the buttons
for(let button of dataButtons) {
  button.addEventListener("click", (e) => {
    event.preventDefault() 
   dataModal.show();
 });
}
