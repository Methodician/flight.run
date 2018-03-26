import { FormControl } from '@angular/forms';

export const validatePhoneNumber = (ctrl: FormControl) => {

    // Added additional condition when form is left an empty string.
    // Non-numeric input prevented by input field.
    if (ctrl.value || ctrl.value == '') {
        const phoneNumber = ctrl.value.replace(/\D/g, '');
        let valid = false;


        // Not necessary since permitting US number format only.
        // if (phoneNumber.length >= 14 && phoneNumber.length <= 15)
        //     valid = true;

        // if (phoneNumber.length >= 10 && phoneNumber.length <= 11)
        //     valid = true;

        if (phoneNumber.length == 0|| phoneNumber.length == 10)
            valid = true;

        return valid ? null : returnNoValid();
    }
    else return returnNoValid();

}

const returnNoValid = () => {
    return {
        validPhoneNumber: {
            valid: false
        }
    };
}