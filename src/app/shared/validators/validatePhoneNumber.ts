import { FormControl } from '@angular/forms';

export const validatePhoneNumber = (ctrl: FormControl) => {

    // Added additional condition when form is left an empty string.
    // Doesn't prevent entering of letters.
    if (ctrl.value || ctrl.value == '') {
        const phoneNumber = ctrl.value.replace(/\D/g, '');
        let valid = false;

        if (phoneNumber.length >= 14 && phoneNumber.length <= 15)
            valid = true;

        if (phoneNumber.length >= 10 && phoneNumber.length <= 11)
            valid = true;

        if (phoneNumber.length == 0)
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