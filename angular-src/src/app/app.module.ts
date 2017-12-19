import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { UpdateProfileService } from './services/update-profile.service';
import { AuthGuard } from './guards/auth.guard';
import { NewArticleComponent } from './components/new-article/new-article.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent, pathMatch: 'full'},
  {path:'register', component: RegisterComponent, pathMatch: 'full'},
  {path:'login', component: LoginComponent, pathMatch: 'full'},
  {path:'profile', component: ProfileComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path:'update', component: UpdateUserComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path:'newarticle', component: NewArticleComponent, pathMatch: 'full', canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterComponent,
    FooterComponent,
    UpdateUserComponent,
    NewArticleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService, AuthService, UpdateProfileService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
