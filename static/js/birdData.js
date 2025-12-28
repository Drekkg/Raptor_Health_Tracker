
//Javascript for the delete modal
const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const deleteButtons = document.getElementsByClassName("btn-delete");
const deleteConfirm = document.getElementById("deleteConfirm");

//Clear local storage for motivation button
document.getElementById("addDailyDataButton").addEventListener("click", ()=> {
localStorage.setItem("motivation", "");
});


//add and wire up the buttons
for(let button of deleteButtons) {
   button.addEventListener("click", (e) => {
    e.stopPropagation();
    let birdId = e.target.dataset.birdId;
    deleteConfirm.href = `delete_bird/${birdId}`;
    deleteModal.show();
  });
}

const mainImg = document.getElementById("main-img");
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");

// add event listeners to img elements to display in a modal
mainImg.addEventListener("click", function (e) {
  if(e.target === mainImg) {
  modal.style.display = "block";
  modalImg.src = this.src;
  modalImg.alt = this.alt;
  }
})

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});



  
