const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const deleteButtons = document.getElementsByClassName("btn-delete");
const deleteConfirm = document.getElementById("deleteConfirm");


for(let button of deleteButtons) {

   button.addEventListener("click", (e) => {
    let birdId = e.target.getAttribute("bird_id");
    deleteConfirm.href = `delete_bird/${birdId}`;
    console.log(`delete_bird/${birdId}`)
    deleteModal.show();
  });
}
