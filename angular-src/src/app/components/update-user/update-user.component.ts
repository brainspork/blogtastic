import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { UpdateProfileService } from '../../services/update-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  user: any;
  firstName: String;
  lastName: String;
  username: String;
  email: String;
  bio: String;
  age: String;
  displayAge: Boolean;
  displayName: Boolean;
  displayEmail: Boolean;

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private updateProfileService: UpdateProfileService,
    private router: Router
  ) { }

  ngOnInit() {
    if(!this.authService.loggedIn()) {
      this.router.navigate(['login']);
    }
  }

  updateProfile() {
    const prefrences = {
      displayName: this.displayName,
      displayEmail: this.displayEmail,
      displayAge: this.displayAge,
    }

    const userInfo = {
      id: JSON.parse(localStorage.user).id,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      age: this.age,
      bio: this.bio,
      preferences: prefrences
    }

    if(!this.validateService.validateEmail(userInfo.email)) {
      return false;
    }

    this.updateProfileService.updateUser(userInfo).subscribe(data => {
      if(data.success) {
        const token = localStorage.id_token;
        localStorage.clear();
        this.authService.storeUserData(token, userInfo);
        this.router.navigate(['/profile']);
      } else {
        this.router.navigate(['/update']);
      }
    });
  }
}
