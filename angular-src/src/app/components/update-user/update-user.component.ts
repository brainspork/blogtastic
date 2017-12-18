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

    this.authService.getProfile().subscribe(data => {
      this.user = {
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        username: data.user.username,
        email: data.user.email,
        bio: data.user.bio,
        age: data.user.age,
        displayAge: data.user.prefrences.displayAge,
        displayName: data.user.prefrences.displayName,
        displayEmail: data.user.prefrences.displayEmail
      }
    });
  }


  updateProfile() {
    const userInfo = {
      id: JSON.parse(localStorage.user)._id,
      username: this.user.username,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      age: this.user.age,
      bio: this.user.bio,
      prefrences: {
        displayName: this.user.displayName,
        displayEmail: this.user.displayEmail,
        displayAge: this.user.displayAge
      }
    }

    if(!this.validateService.validateEmail(userInfo.email)) {
      return false;
    }

    this.updateProfileService.updateUser(userInfo).subscribe(data => {
      if(data.success) {
        const token = localStorage.id_token;
        this.authService.getProfile().subscribe(data => {
          this.authService.storeUserData(token, data.user);
        })
        this.router.navigate(['/profile']);
      } else {
        this.router.navigate(['/update']);
      }
    });
  }
}
