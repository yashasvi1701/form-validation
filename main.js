let id = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);
 
let username = id("username"),
    email = id("email"),
    password = id("password"),
    confirmPassword = id("confirmPassword"),
    phoneNumber = id("phoneNumber"),
    form = id("form"),
    errorMsg = classes("error"),
    successMsg = id("success-message"),
    successIcon = classes("success-icon"),
    failureIcon = classes("failure-icon");

let resetButton = id("reset");

resetButton.addEventListener("click", () => {
    // Reset styles and messages for all fields
    resetField(username, 0);
    resetField(email, 1);
    resetField(password, 2);
    resetField(confirmPassword, 3);
    resetField(phoneNumber, 4);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    engine(username, 0, "Username cannot be blank");
    validateEmail(email, 1);
    validatePassword(password, 2);
    engine(confirmPassword, 3, "Confirm Password cannot be blank");
    engine(phoneNumber, 4, "Phone Number cannot be blank");

    // Check if phone number is numeric and has exactly 10 digits
    if (!isValidPhoneNumber(phoneNumber.value)) {
        if (!/^\d+$/.test(phoneNumber.value)) {
            errorMsg[4].innerHTML = "Only numeric characters are allowed";
        } else {
            errorMsg[4].innerHTML = "Phone Number must contain exactly 10 digits";
        }
        phoneNumber.style.border = "2px solid red";
        failureIcon[4].style.opacity = "1";
        successIcon[4].style.opacity = "0";
    } else {
        resetField(phoneNumber, 4);  // Reset on successful validation
    }

    // Check if passwords match
    if (password.value !== confirmPassword.value) {
        errorMsg[3].innerHTML = "Passwords do not match";
        confirmPassword.style.border = "2px solid red";
        failureIcon[3].style.opacity = "1";
        successIcon[3].style.opacity = "0";
    } else {
        resetField(confirmPassword, 3);  // Reset on successful validation
    }

    // Check if all fields are valid, then show success message
    if (isFormValid()) {
        showSuccessMessage();
    }
});

confirmPassword.addEventListener("input", () => {
    if (confirmPassword.value === password.value) {
        resetField(confirmPassword, 3);  // Reset on real-time validation
    } else {
        errorMsg[3].innerHTML = "Passwords do not match";
        confirmPassword.style.border = "2px solid red";
        failureIcon[3].style.opacity = "1";
        successIcon[3].style.opacity = "0";
    }
});

phoneNumber.addEventListener("input", () => {
    if (!isValidPhoneNumber(phoneNumber.value)) {
        if (!/^\d+$/.test(phoneNumber.value)) {
            errorMsg[4].innerHTML = "Only numeric characters are allowed";
        } else {
            errorMsg[4].innerHTML = "Phone Number must contain exactly 10 digits";
        }
        phoneNumber.style.border = "2px solid red";
        failureIcon[4].style.opacity = "1";
        successIcon[4].style.opacity = "0";
    } else {
        resetField(phoneNumber, 4);  // Reset on real-time validation
    }
});

password.addEventListener("input", () => {
    // Reset password error message when it meets the criteria
    validatePassword(password, 2);
});

// Add an input event listener to the username field for real-time validation
username.addEventListener("input", () => {
  validateUsername(username, 0);
});

let validateUsername = (id, serial) => {
  // Check if the entered username is an email address or just a number
  if (/^\S+@\S+\.\S+$/.test(id.value.trim())) {
      errorMsg[serial].innerHTML = "Username cannot be an email address";
      id.style.border = "2px solid red";
      failureIcon[serial].style.opacity = "1";
      successIcon[serial].style.opacity = "0";
  } else if (/^\d+$/.test(id.value.trim())) {
      errorMsg[serial].innerHTML = "Username cannot be just a number";
      id.style.border = "2px solid red";
      failureIcon[serial].style.opacity = "1";
      successIcon[serial].style.opacity = "0";
  } else {
      resetField(id, serial);  // Reset on successful validation
  }
};

// Modify the engine function to use the validateUsername function
let engine = (id, serial, message) => {
  if (id.value.trim() === "") {
      errorMsg[serial].innerHTML = message;
      id.style.border = "2px solid red";
      failureIcon[serial].style.opacity = "1";
      successIcon[serial].style.opacity = "0";
  } else {
      validateUsername(id, serial);
  }
};


let resetField = (id, serial) => {
    errorMsg[serial].innerHTML = "";
    id.style.border = "2px solid #c4c4c4";
    failureIcon[serial].style.opacity = "0";
    successIcon[serial].style.opacity = "0";
};

let showSuccessMessage = () => {
    alert("Form submitted successfully!");
    window.location.reload();
};

let isFormValid = () => {
    // Check if all error messages are empty, indicating all fields are valid
    for (let i = 0; i < errorMsg.length; i++) {
        if (errorMsg[i].innerHTML !== "") {
            return false;
        }
    }
    return true;
};

// Function to check if the phone number is numeric and has exactly 10 digits
function isValidPhoneNumber(phoneNumber) {
    return /^\d{10}$/.test(phoneNumber);
}

// Function to validate email format
function validateEmail(email, serial) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        errorMsg[serial].innerHTML = "Enter a valid email address";
        email.style.border = "2px solid red";
        failureIcon[serial].style.opacity = "1";
        successIcon[serial].style.opacity = "0";
    } else {
        resetField(email, serial);  // Reset on successful validation
    }
}

// Function to validate password format
function validatePassword(password, serial) {
    // Minimum 8 characters, at least one uppercase letter, and one numeric digit
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password.value)) {
        errorMsg[serial].innerHTML =
            "Password must be at least 8 characters, including one uppercase letter and one numeric digit";
        password.style.border = "2px solid red";
        failureIcon[serial].style.opacity = "1";
        successIcon[serial].style.opacity = "0";
    } else {
        resetField(password, serial);  // Reset on successful validation
    }
}

// Password visibility toggle
let passwordVisibilityToggle = id("password-visibility-toggle");
let passwordInput = id("password");

passwordVisibilityToggle.addEventListener("change", () => {
    passwordInput.type = passwordVisibilityToggle.checked ? "text" : "password";
});

