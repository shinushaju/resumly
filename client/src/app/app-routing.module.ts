import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageprofileComponent } from './manageprofile/manageprofile.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'start', component: OnboardingComponent},
  {path: 'myprofile', component: ManageprofileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
