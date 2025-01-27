import { forValidation } from "./Interface";

export class Validations {
  private static instance: Validations;
  private validations: forValidation;

  private constructor() {
    this.validations = {
      full_name: {
        require: {
          logic: (val) => {
            return val.trim() === "";
          },
          message: "Name can't be empty",
        },
        short: {
          logic: (val) => {
            return val.length < 3;
          },
          message: "Name is too short",
        },
      },
      email: {
        require: {
          logic: (val) => {
            return val.trim() === "";
          },
          message: "Email can't be empty",
        },
        wrong_format: {
          logic: (val) => {
            const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return !(email_regex.test(val));
          },
          message: "Email format is invalid",
        },
      },
      contact: {
        require: {
          logic: (val) => {
            return val.trim() === "";
          },
          message: "Contact no. can't be empty",
        },
        not_number: {
          logic: (val) => {
            return isNaN(Number(val));
          },
          message: "Contact no. should be a number",
        },
        short: {
          logic: (val) => {
            return val.length < 10;
          },
          message: "Contact no. is too short",
        },
        long:{
          logic: (val) => {
            return val.length > 10;
          },
          message: "Contact no. is too long",
        },
        wrong_format: {
          logic: (val) => {
            const phone_regex = /^\d{10}$/;
            return !(phone_regex.test(val));
          },
          message: "Contact no. format is invalid",
        },
      },
      password: {
        require: {
          logic: (val) => {
            return val.trim() === "";
          },
          message: "Password can't be empty",
        },
        wrong_format: {
          logic: (val) => {
            const password_regexx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
            return !(password_regexx.test(val));
          },
          message:
            "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
        },
      },
      agree:{
        require:{
          logic: (val) => {
            return !(<HTMLInputElement>document.getElementById("agree")).checked;
          },
          message: "Please check this box to proceed",
        }
      }
    };
  }

  static getInstance(): Validations {
    if (!Validations.instance) {
      Validations.instance = new Validations();
    }
    return Validations.instance;
  }

  checkError(id: string, value: string): string {
    let message = "";
    for (const key of Object.keys(this.validations[id])) {
      if (this.validations[id][key].logic(value)) {
        message = this.validations[id][key].message;
        console.log(message);
        break;
      }
    }
    return message;
  }
}
