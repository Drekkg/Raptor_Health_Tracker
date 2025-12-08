
//Javascript for the delete modal
const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const deleteButtons = document.getElementsByClassName("btn-delete");
const deleteConfirm = document.getElementById("deleteConfirm");


//add and wire up the buttons
for(let button of deleteButtons) {
   button.addEventListener("click", (e) => {
    let birdId = e.target.dataset.birdId;
    deleteConfirm.href = `delete_bird/${birdId}`;
    deleteModal.show();
  });
}



