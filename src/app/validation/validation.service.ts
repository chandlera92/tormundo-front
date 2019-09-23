import {Injectable} from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() {
  }

  public config = {
    'required': 'Required',
    'invalidCreditCard': 'Is invalid credit card number',
    'invalidEmailAddress': 'Invalid email address',
    'invalidPassword': 'Password must be at least 6 characters long, and contain a number.',
    'areNotEqual': 'Fields do not match',
    'pickType': 'Required'
  };

  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    return this.config[validatorName];
  }

  emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {'invalidEmailAddress': true};
    }
  }

  passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/) || control.value == '') {
      return null;
    } else {
      return {'invalidPassword': true};
    }
  }

  areEqual(group: any) {

    let valid = false;

    let arr = [];

    for (const name in group.controls) {
      const val = group.controls[name].value;
      arr.push(val);
    }

    valid
      = arr[0] == arr[1] ? true
      : arr[0].length == 0 || arr[1].length == 0 ? true
        : false;

    if (valid) {
      return null;
    }

    return {
      'areNotEqual': true
    };
  }

  showErrors(form) {
    for (const control in form.controls) {
      form.controls[control].markAsTouched();
    }
  }


}
