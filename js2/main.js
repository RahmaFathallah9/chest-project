$(".form")
  .find("input, textarea")
  .on("keyup blur focus", function (e) {
    var $this = $(this),
      label = $this.prev("label");

    if (e.type === "keyup") {
      if ($this.val() === "") {
        label.removeClass("active highlight");
      } else {
        label.addClass("active highlight");
      }
    } else if (e.type === "blur") {
      if ($this.val() === "") {
        label.removeClass("active highlight");
      } else {
        label.removeClass("highlight");
      }
    } else if (e.type === "focus") {
      if ($this.val() === "") {
        label.removeClass("highlight");
      } else if ($this.val() !== "") {
        label.addClass("highlight");
      }
    }
  });

$(".tab a").on("click", function (e) {
  e.preventDefault();

  $(this).parent().addClass("active");
  $(this).parent().siblings().removeClass("active");

  target = $(this).attr("href");

  $(".tab-content > div").not(target).hide();

  $(target).fadeIn(600);
});

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

/*
//upload
var uploadForm = document.querySelector("#up");
if (uploadForm) {
  uploadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var fileInput = document.getElementById("file");

    var token = sessionStorage.getItem("token");
    var formdata = new FormData();
    formdata.append("receipt", fileInput.files[0]);
    // formdata.append("userID", "64908040794edcdba58334b9");
    formdata.append("token", token);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };

    fetch("https://graduation-project-code.onrender.com/upload", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  });
}
*/
