document.getElementById("contact-form").onsubmit = () => {
    clearErrors();

    let isValid = true;

    // Validate first name
    let firstName = document.getElementById("first-name").value.trim();
    if(!firstName) {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    // Validate last name
    let lastName = document.getElementById("last-name").value.trim();
    if(!lastName) {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    // Validate LinkedIn URL
    let linkedIn = document.getElementById("linkedin").value.trim();
    let requiredPrefix = "https://linkedin.com/in/";
    if (linkedIn !== "" && !linkedIn.startsWith(requiredPrefix)) {
        document.getElementById("err-linkedin").style.display = "block";
        isValid = false;
    }

    // Validate email
    let email = document.getElementById("email").value.trim();
    let mailingList = document.getElementById("mailing-list");
    if(mailingList.checked && email === "") {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }
    else if(email != "") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            emailError.textContent = "Email must be in a valid format (name@example.com).";
            isValid = false;
        }
    }

    // Validate how we met
    let meeting = document.getElementById("meet").value;
    if(meeting == 'none') {
        document.getElementById("err-meet").style.display = "block";
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}