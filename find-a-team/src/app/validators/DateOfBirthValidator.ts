import { FormControl } from "@angular/forms";

export class DateOfBirthValidator {

  static getDateOfBirthValidator() {
    return function DateOfBirthValidator(control: FormControl): { [s: string]: boolean } {
        const date = new Date(control.value)
        const today = new Date()
        const minDate = new Date((today.getFullYear() - 10), today.getMonth(), today.getDate())
        if (date > minDate) {
            return {invalidDate: true};
        }


      return null;
    }
  }
}
