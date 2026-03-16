export function validateForm(data) {
    console.log("Server side validation happens here");
    console.log(data);

    const errors = [];

    if (data['first-name'].trim() == "") {
        errors.push("First name is required.");
    }

    if (data['last-name'].trim() == "") {
        errors.push("Last name is required.");
    }

    const validMeets = ['conference', 'referral', 'coworker', 'former-coworker', 'college', 
        'online', 'other'];
    if (!validMeets.includes(data.meet)) {
        errors.push("Please state where you met.");
    }

    if (data['mailing-list'] === 'on') {
        if (data['email-format'] !== 'html' && data['email-format'] !== 'text') {
            errors.push("Please select your preferred email format.");
        }
    }

    console.log(errors);
    return {
        isValid: errors.length === 0,
        errors
    }
}