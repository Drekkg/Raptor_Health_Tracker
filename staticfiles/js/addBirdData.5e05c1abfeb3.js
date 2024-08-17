
const dataModal = new bootstrap.Modal(document.getElementById("addDataModal"));
const dataButtons = document.getElementsByClassName("btn-add-data");
const dataConfirm = document.getElementById("addDataConfirm");



//Javascript for the add daily data modal
for(let button of dataButtons) {
  button.addEventListener("click", (e) => {
    event.preventDefault() 
   dataModal.show();
 });
}
