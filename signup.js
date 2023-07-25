function validateform() {
  var name = document.myform.name.value;
  var email = document.myform.email.value;
  var phno = document.myform.phno.value;
  var password = document.myform.password.value;
  var password1 = document.myform.password1.value;

  // Validate name
  if (name == "") {
    alert("Name must be filled out");
    return false;
  }

  // Validate email
  if (email == "") {
    alert("Email must be filled out");
    return false;
  } else {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address");
      return false;
    }
  }

  // Validate phone number
  if (phno == "") {
    alert("Phone number must be filled out");
    return false;
  } else {
    var phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phno)) {
      alert("Invalid phone number");
      return false;
    }
  }

  // Validate password
  if (password == "") {
    alert("Password must be filled out");
    return false;
  } else {
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number"
      );
      return false;
    }
  }
  if (password != password1) {
    alert("enter the correct password");
    return false;
  }
}

window.addEventListener("load", start1, false);
function start1() {
  document.getElementById("name").addEventListener("focus", focusone, false);
  document.getElementById("name").addEventListener("blur", blurone, false);
  document.getElementById("phno").addEventListener("focus", focustwo, false);
  document.getElementById("phno").addEventListener("blur", blurone, false);
  document.getElementById("email").addEventListener("focus", focusthree, false);
  document.getElementById("email").addEventListener("blur", blurone, false);
  document.getElementById("myform").addEventListener("submit", subfun, false);
  //document.getElementById("myform").addEventListener("reset", resetfun, false);
}

function focusone() {
  document.getElementById("help").innerHTML = "Enter your name";
}
function focustwo() {
  document.getElementById("help").innerHTML = "Enter your phone no.";
}
function focusthree() {
  document.getElementById("help").innerHTML = "Enter your email";
}
function blurone() {
  document.getElementById("help").innerHTML = "";
}

function start() {
  document.getElementById("move").addEventListener("mousemove", moveone, false);
  document.getElementById("move").addEventListener("mouseout", leaveone, false);
}

function moveone() {
  document.getElementById("move").innerHTML = "Kongu Engineering College";
}

function leaveone() {
  document.getElementById("move").innerHTML = "KEC";
}
window.addEventListener("load", start, false);
