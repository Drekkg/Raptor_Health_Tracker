const editButtons = document.getElementsByClassName("btn-edit");
const birdNameNew = document.getElementById("id_body");
const commentForm = document.getElementById("commentForm");
const submitButton = document.getElementById("submitButton");

/**
* Initializes edit functionality for the provided edit buttons.
* 
* For each button in the `editButtons` collection:
* - Retrieves the associated comment's ID upon click.
* - Fetches the content of the corresponding comment.
* - Populates the `commentText` input/textarea with the comment's content for editing.
* - Updates the submit button's text to "Update".
* - Sets the form's action attribute to the `edit_comment/{commentId}` endpoint.
*/

  button.addEventListener("click", (e) => {
    let birdName = e.target.getAttribute("bird_name");
    let birdData = document.getElementById("bird_name").innerText;
    commentText.value = commentContent;
    submitButton.innerText = "Update";
    commentForm.setAttribute("action", `edit_comment/${commentId}`);
  });


  // button.addEventListener("click", (e) => {
  //   let commentId = e.target.getAttribute("comment_id");
  //   let commentContent = document.getElementById(`comment${commentId}`).innerText;
  //   commentText.value = commentContent;
  //   submitButton.innerText = "Update";
  //   commentForm.setAttribute("action", `edit_comment/${commentId}`);
  // });
