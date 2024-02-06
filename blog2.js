if (!localStorage.getItem("likeCount-Blog2")) {
    localStorage.setItem("likeCount-Blog2", "99");
  }
  if (!localStorage.getItem("liked-Blog2")) {
    localStorage.setItem("liked-Blog2", "not-liked");
  }

  document.getElementById("like-dislike").src =
    localStorage.getItem("liked-Blog2") == "liked"
      ? "like.png"
      : "dislike.png";

  document.getElementById("like-count").textContent =
    localStorage.getItem("likeCount-Blog2");

  const likeDislike = document.getElementById("like-dislike");

  likeDislike.addEventListener("click", () => {
    likeDislike.style.animation = "popIn 0.3s";
    likeDislike.style.animationFillMode = "forwards";
    setTimeout(() => {
      likeDislike.style.animation = "";
    }, 300);

    if (localStorage.getItem("liked-Blog2") == "liked") {
      likeDislike.src = "dislike.png";
      localStorage.setItem("liked-Blog2", "not-liked");
      localStorage.setItem(
        "likeCount-Blog2",
        String(Number(localStorage.getItem("likeCount-Blog2")) - 1)
      );
    } else {
      likeDislike.src = "like.png";
      localStorage.setItem("liked-Blog2", "liked");
      localStorage.setItem(
        "likeCount-Blog2",
        String(Number(localStorage.getItem("likeCount-Blog2")) + 1)
      );
    }
    document.getElementById("like-count").textContent =
      localStorage.getItem("likeCount-Blog2");
  });


// <!-- Comment script -->
  function loadComments() {
    var comments = JSON.parse(localStorage.getItem("comments-Blog2")) || [];
    var commentSection = document.getElementById("comments");

    for (var i = 0; i < comments.length; i++) {
      var commentDiv = document.createElement("div");
      commentDiv.className = "comment-container";

      var nameDiv = document.createElement("div");
      nameDiv.className = "comment-uname";
      nameDiv.textContent = comments[i].username;

      var textDiv = document.createElement("div");
      textDiv.className = "comment-content";
      textDiv.textContent = comments[i].comment;

      commentDiv.appendChild(nameDiv);
      commentDiv.appendChild(textDiv);

      // Append the comment div to the comment section
      commentSection.appendChild(commentDiv);
    }
  }

  loadComments();

  const commentForm = document.getElementById("comment-form");
  commentForm.addEventListener("submit", (data) => {
    data.preventDefault();
    const username = data.target.username.value;
    const comment = data.target.comment.value;

    if (!username || !comment) {
      return;
    }

    if (!localStorage.getItem("comments-Blog2")) {
      localStorage.setItem("comments-Blog2", "[]");
    }

    const comments = JSON.parse(localStorage.getItem("comments-Blog2"));
    comments.push({ username, comment });
    localStorage.setItem("comments-Blog2", JSON.stringify(comments));

    data.target.username.value = "";
    data.target.comment.value = "";

    const commentSection = document.getElementById("comments");
    commentSection.innerHTML = "";
    loadComments();
  });
