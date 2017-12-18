import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: String;
  lastName: String;
  username: String;
  email: String;
  password: String;
  confirm: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const prefrences = {
      displayName: false,
      displayEmail: false,
      displayAge: false
    }

    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      password: this.password,
      confirm: this.confirm,
      prefrences: prefrences
    }

    //Require fields
    if(!this.validateService.validateRegister(user)) {
    return false;
    }

    //validate email
    if(!this.validateService.validateEmail(user.email)) {
      return false;
    }

    //validate password
    if(!this.validateService.validatePassword(user.password, user.confirm)) {
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/register']);
      }
    });
  }
}
