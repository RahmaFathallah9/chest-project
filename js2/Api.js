var signUp = document.querySelector("#signUp");
if (signUp != null) {
  document.querySelector("#signUp").addEventListener("submit", (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      confirmPassword: document.querySelector("#confirmPassword").value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    async function post() {
      const response = await fetch(
        "https://graduation-project-code.onrender.com/signUp",
        requestOptions
      );
      const data = await response.json();
      if (data.message == "sucsses") {
        window.location = "http://127.0.0.1:5500/signin.html";
      } else if (data.message == "email exists") {
        window.location = "http://127.0.0.1:5500/signin.html";
      } else {
        const style = document.createElement("style");

        for (let error of data.errors) {
          alert(error.msg + " in  " + error.path);
          if (error.path == "password") {
            style.innerHTML = `
      #password {
        color: red;
        font-size: 24px;
      }
    `;
            document.head.appendChild(style);
          }
          if (error.path == "confirmPassword") {
            document.head.appendChild(style);
            style.innerHTML = `
      #confirmPassword {
        color: red;
        font-size: 24px;
      }
    `;
            document.head.appendChild(style);
          }
        }
      }
    }
    post();
  });
}

/*
    fetch("https://graduation-project-code.onrender.com/signUp", requestOptions)
      .then((response) => {
        if (response.ok) {
          window.location = "http://127.0.0.1:5500/signin.html";
        } else {
          console.error("Login failed");
          console.log("12345");
        }
      })
      .catch((error) => {
        console.error(error);
        console.log("catch");
      })
      .then((response) => response.text())

      .then((result) => console.log(result));
  });

}
*/
//signin
var signin = document.querySelector("#signIn");

if (signin != null) {
  document.querySelector("#signIn").addEventListener("submit", (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    /*
  

*/
    async function post() {
      const response = await fetch(
        "https://graduation-project-code.onrender.com/signin",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("token", data.token);

      if (data.message == "email doesnt exist") {
        alert("email doesnt exist");
      } else if (data.message == " incorrect password ") {
        alert(" incorrect password");
        const style = document.createElement("style");
        style.innerHTML = `
        #password {
          color: red;
          font-size: 24px;
        }
      `;
        document.head.appendChild(style);
      } else {
        window.location = "http://127.0.0.1:5500/index.html";
      }
    }
    post();
  });
}

//upload
var uploadForm = document.querySelector("#up");
if (uploadForm != null) {
  if (uploadForm) {
    uploadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      var fileInput = document.getElementById("file");

      var token = sessionStorage.getItem("token");
      console.log(token);

      var formdata = new FormData();
      formdata.append("receipt", fileInput.files[0]);
      // formdata.append("userID", "64908040794edcdba58334b9");
      formdata.append("token", token);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
        headers: {
          //"Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      };

      fetch(
        "https://graduation-project-code.onrender.com/upload",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    });
  }
}
//flask

var uploadForm = document.querySelector("#up");
if (uploadForm != null) {
  if (uploadForm) {
    uploadForm.addEventListener("submit", (e) => {
      e.preventDefault();

      var fileInput = document.getElementById("file");
      var formdata = new FormData();
      formdata.append("file", fileInput.files[0]);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      async function fpost() {
        const response = await fetch(
          "http://127.0.0.1:5000/predict",
          requestOptions
        );
        var data = await response.json();
        console.log(data);

        function displayMessage() {
          var messageDiv = document.getElementById("message");
          if (data.label == "Atelectasis") {
            messageDiv.innerHTML =
              "Disease Name is : " +
              "  " +
              "( " +
              data.label +
              " )" +
              " " +
              "With Rate : " +
              "( " +
              data.probability +
              " )" +
              "<br>" +
              '<a href="patient.html#Atelectasis">' +
              '<h2 class="readmore">' +
              "<u>" +
              "what is Atelectasis" +
              "</u>" +
              "</h2>";
            messageDiv.style.display = "block";
          } else if (data.label == "Cardiomegaly") {
            messageDiv.innerHTML =
              "Disease Name is : " +
              "  " +
              "( " +
              data.label +
              " )" +
              " " +
              "With Rate : " +
              "( " +
              data.probability +
              " )" +
              "<br>" +
              '<a href="patient.html#Cardiomegaly">' +
              '<h2 class="readmore">' +
              "<u>" +
              "what is Cardiomegaly" +
              "</u>" +
              "</h2>";
            messageDiv.style.display = "block";
          } else if (data.label == "Consolidation") {
            messageDiv.innerHTML =
              "Disease Name is : " +
              "  " +
              "( " +
              data.label +
              " )" +
              " " +
              "With Rate : " +
              "( " +
              data.probability +
              " )" +
              "<br>" +
              '<a href="patient.html#Consolidation">' +
              '<h2 class="readmore">' +
              "<u>" +
              "what is Consolidation" +
              "</u>" +
              "</h2>";
            messageDiv.style.display = "block";
          } else if (data.label == "Edema") {
            messageDiv.innerHTML =
              "Disease Name is : " +
              "  " +
              "( " +
              data.label +
              " )" +
              " " +
              "With Rate : " +
              "( " +
              data.probability +
              " )" +
              "<br>" +
              '<a href="patient.html#Edema">' +
              '<h2 class="readmore">' +
              "<u>" +
              "what is Edema" +
              "</u>" +
              "</h2>";
            messageDiv.style.display = "block";
          } else if (data.label == "Effusion") {
            messageDiv.innerHTML =
              "Disease Name is : " +
              "  " +
              "( " +
              data.label +
              " )" +
              " " +
              "With Rate : " +
              "( " +
              data.probability +
              " )" +
              "<br>" +
              '<a href="patient.html#Effusion">' +
              '<h2 class="readmore">' +
              "<u>" +
              "what is Effusion" +
              "</u>" +
              "</h2>";
            messageDiv.style.display = "block";
          } else if (data.label == "Emphysema") {
            messageDiv.innerHTML =
              "Disease Name is : " +
              "  " +
              "( " +
              data.label +
              " )" +
              " " +
              "With Rate : " +
              "( " +
              data.probability +
              " )" +
              "<br>" +
              '<a href="patient.html#Emphysema">' +
              '<h2 class="readmore">' +
              "<u>" +
              "what is Emphysema" +
              "</u>" +
              "</h2>";
            messageDiv.style.display = "block";
          } else if (data.label == "Fibrosis") {
            messageDiv.innerHTML =
              "Disease Name is : " +
              "  " +
              "( " +
              data.label +
              " )" +
              " " +
              "With Rate : " +
              "( " +
              data.probability +
              " )" +
              "<br>" +
              '<a href="patient.html#Fibrosis">' +
              '<h2 class="readmore">' +
              "<u>" +
              "what is Fibrosis" +
              "</u>" +
              "</h2>";
            messageDiv.style.display = "block";
          } else if (data.label == "Hernia") {
            messageDiv.innerHTML =
              "Disease Name is : " +
              "  " +
              "( " +
              data.label +
              " )" +
              " " +
              "With Rate : " +
              "( " +
              data.probability +
              " )" +
              "<br>" +
              '<a href="patient.html#Hernia">' +
              '<h2 class="readmore">' +
              "<u>" +
              "what is Hernia" +
              "</u>" +
              "</h2>";
            messageDiv.style.display = "block";
          } else if (data.label == "Infiltration") {
            messageDiv.innerHTML =
              "Disease Name is : " +
              "  " +
              "( " +
              data.label +
              " )" +
              " " +
              "With Rate : " +
              "( " +
              data.probability +
              " )" +
              "<br>" +
              '<a href="patient.html#Infiltration">' +
              '<h2 class="readmore">' +
              "<u>" +
              "what is Infiltration" +
              "</u>" +
              "</h2>";
            messageDiv.style.display = "block";
          } else if (data.label == "Mass") {
            messageDiv.innerHTML =
              "Disease Name is : " +
              "  " +
              "( " +
              data.label +
              " )" +
              " " +
              "With Rate : " +
              "( " +
              data.probability +
              " )" +
              "<br>" +
              '<a href="patient.html#Mass">' +
              '<h2 class="readmore">' +
              "<u>" +
              "what is Mass" +
              "</u>" +
              "</h2>";
            messageDiv.style.display = "block";
          } else if (data.label == "Nodule") {
            messageDiv.innerHTML =
              "Disease Name is : " +
              "  " +
              "( " +
              data.label +
              " )" +
              " " +
              "With Rate : " +
              "( " +
              data.probability +
              " )" +
              "<br>" +
              '<a href="patient.html#Nodule">' +
              '<h2 class="readmore">' +
              "<u>" +
              "what is Nodule" +
              "</u>" +
              "</h2>";
            messageDiv.style.display = "block";
          } else if (data.label == "Pleural_Thickening") {
            messageDiv.innerHTML =
              "Disease Name is : " +
              "  " +
              "( " +
              data.label +
              " )" +
              " " +
              "With Rate : " +
              "( " +
              data.probability +
              " )" +
              "<br>" +
              '<a href="patient.html#Pleural_Thickening">' +
              '<h2 class="readmore">' +
              "<u>" +
              "what is Pleural_Thickening" +
              "</u>" +
              "</h2>";
            messageDiv.style.display = "block";
          } else if (data.label == "Pneumonia") {
            messageDiv.innerHTML =
              "Disease Name is : " +
              "  " +
              "( " +
              data.label +
              " )" +
              " " +
              "With Rate : " +
              "( " +
              data.probability +
              " )" +
              "<br>" +
              '<a href="patient.html#Pneumonia">' +
              '<h2 class="readmore">' +
              "<u>" +
              "what is Pneumonia" +
              "</u>" +
              "</h2>";
            messageDiv.style.display = "block";
          } else if (data.label == "Pneumothorax") {
            messageDiv.innerHTML =
              "Disease Name is : " +
              "  " +
              "( " +
              data.label +
              " )" +
              " " +
              "With Rate : " +
              "( " +
              data.probability +
              " )" +
              "<br>" +
              '<a href="patient.html#Pneumothorax">' +
              '<h2 class="readmore">' +
              "<u>" +
              "what is Pneumothorax" +
              "</u>" +
              "</h2>";
            messageDiv.style.display = "block";
          } else if (data.label == "No Finding") {
            messageDiv.innerHTML =
              "There is no known disease. If you still feel symptoms, it is best to see a doctor";
            messageDiv.style.display = "block";
          } else {
            messageDiv.innerHTML =
              "You upload incorrect image , try again with another image";
            messageDiv.style.display = "block";
          }
        }

        displayMessage();
      }
      fpost();
    });
  }
}
