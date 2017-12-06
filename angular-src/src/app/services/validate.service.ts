import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  //Add in flash service
  validateRegister(user) {
    if(user.firstName == undefined || user.lastName == undefined || user.email == undefined || user.username == undefined || user.password == undefined || user.confirm == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  validatePassword(password, confirm) {
    if(password !== confirm) {
      return false;
    } else {
      return true;
    }
  }
}
