//  FUNCTION TO CHECK IF FIRST NAME IS VALID 
function isFirstNameValid(firstname) {
    var cleaned = firstname.trim();
    if (cleaned.length >= 2) {
        return true;
    } else {
        return false;
    }
}

//  FUNCTION TO CHECK IF LAST NAME IS VALID 
function isLastNameValid(lastname) {
    var cleaned = lastname.trim();
    if (cleaned.length >= 2) {
        return true;
    } else {
        return false;
    }
}

//  FUNCTION TO CHECK IF EMAIL IS VALID 
function isEmailValid(email) {
    var cleaned = email.trim();
    if (cleaned.includes("@") && cleaned.includes(".")) {
        return true;
    } else {
        return false;
    }
}

//  FUNCTION TO CHECK IF PHONE NUMBER IS VALID 
function isPhoneValid(phone) {
    var cleaned = phone.replace(/[\s\-\(\)]/g, "");
    if (cleaned.length >= 10) {
        return true;
    } else {
        return false;
    }
}

//  FUNCTION TO CHECK IF MESSAGE IS VALID 
function isMessageValid(message) {
    var cleaned = message.trim();
    if (cleaned.length >= 10) {
        return true;
    } else {
        return false;
    }
}

//  FUNCTION TO SHOW ERROR MESSAGE 
function showError(fieldId, errorMessage) {
    var inputField = document.getElementById(fieldId);
    var errorElement = document.getElementById(fieldId + "-error");
    
    errorElement.textContent = errorMessage;
    inputField.classList.add("input-error");
}

//  FUNCTION TO CLEAR ERROR MESSAGE 
function clearError(fieldId) {
    var inputField = document.getElementById(fieldId);
    var errorElement = document.getElementById(fieldId + "-error");
    
    errorElement.textContent = "";
    inputField.classList.remove("input-error");
}

//  FUNCTION TO CLEAR ALL ERRORS 
function clearAllErrors() {
    clearError("firstname");
    clearError("lastname");
    clearError("email");
    clearError("tel");
    clearError("identity");
    clearError("usermessage");
}

//  WHEN USER LEAVES THE FIRST NAME FIELD, CHECK IF IT'S VALID 
document.getElementById("firstname").addEventListener("blur", function() {
    if (!isFirstNameValid(this.value)) {
        showError("firstname", "First name must be at least 2 characters long");
    } else {
        clearError("firstname");
    }
});

//  WHEN USER LEAVES THE LAST NAME FIELD, CHECK IF IT'S VALID 
document.getElementById("lastname").addEventListener("blur", function() {
    if (!isLastNameValid(this.value)) {
        showError("lastname", "Last name must be at least 2 characters long");
    } else {
        clearError("lastname");
    }
});

//  WHEN USER LEAVES THE EMAIL FIELD, CHECK IF IT'S VALID 
document.getElementById("email").addEventListener("blur", function() {
    if (!isEmailValid(this.value)) {
        showError("email", "Please enter a valid email address");
    } else {
        clearError("email");
    }
});

//  WHEN USER LEAVES THE PHONE FIELD, CHECK IF IT'S VALID 
document.getElementById("tel").addEventListener("blur", function() {
    if (!isPhoneValid(this.value)) {
        showError("tel", "Please enter a valid phone number (at least 10 digits)");
    } else {
        clearError("tel");
    }
});

//  WHEN USER LEAVES THE IDENTITY FIELD, CHECK IF IT'S SELECTED 
document.getElementById("identity").addEventListener("blur", function() {
    if (this.value === "") {
        showError("identity", "Please select an identity type");
    } else {
        clearError("identity");
    }
});

//  WHEN USER LEAVES THE MESSAGE FIELD, CHECK IF IT'S VALID 
document.getElementById("usermessage").addEventListener("blur", function() {
    if (!isMessageValid(this.value)) {
        showError("usermessage", "Message must be at least 10 characters long");
    } else {
        clearError("usermessage");
    }
});

//  WHEN USER CLICKS THE SUBMIT BUTTON 
document.getElementById("userform").addEventListener("submit", function(event) {
    event.preventDefault();

    var msgBox = document.getElementById("message");
    clearAllErrors();

    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var tel = document.getElementById("tel").value;
    var identity = document.getElementById("identity").value;
    var message = document.getElementById("usermessage").value;

    var firstnameOk = isFirstNameValid(firstname);
    var lastnameOk = isLastNameValid(lastname);
    var emailOk = isEmailValid(email);
    var telOk = isPhoneValid(tel);
    var identityOk = (identity !== "");
    var messageOk = isMessageValid(message);

    if (!firstnameOk) {
        showError("firstname", "First name must be at least 2 characters long");
    }
    if (!lastnameOk) {
        showError("lastname", "Last name must be at least 2 characters long");
    }
    if (!emailOk) {
        showError("email", "Please enter a valid email address");
    }
    if (!telOk) {
        showError("tel", "Please enter a valid phone number (at least 10 digits)");
    }
    if (!identityOk) {
        showError("identity", "Please select an identity type");
    }
    if (!messageOk) {
        showError("usermessage", "Message must be at least 10 characters long");
    }

    if (!firstnameOk || !lastnameOk || !emailOk || !telOk || !identityOk || !messageOk) {
        msgBox.style.color = "red";
        msgBox.textContent = "Please fix all errors before submitting.";
        return;
    }

    msgBox.style.color = "green";
    msgBox.textContent = "Form submitted successfully!";
    
    console.log("Form submitted with data:");
    console.log("First Name: " + firstname);
    console.log("Last Name: " + lastname);
    console.log("Email: " + email);
    console.log("Phone: " + tel);
    console.log("Identity: " + identity);
    console.log("Message: " + message);

    setTimeout(function() {
        document.getElementById("userform").reset();
        msgBox.textContent = "";
        clearAllErrors();
    }, 2000);
});