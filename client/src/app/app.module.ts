import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ManageprofileComponent } from './manageprofile/manageprofile.component';
import { AboutComponent, EditAboutComponent } from './manageprofile/categories/about/about.component';
import { ProjectComponent,  AddProjectComponent } from './manageprofile/categories/project/project.component';
import { ExperienceComponent, AddExperienceComponent } from './manageprofile/categories/experience/experience.component';
import { EducationComponent, AddEducationComponent } from './manageprofile/categories/education/education.component';
import { AwardComponent } from './manageprofile/categories/award/award.component';
import { SkillComponent } from './manageprofile/categories/skill/skill.component';
import { ContactComponent } from './manageprofile/categories/contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
// import and register filepond file type validation plugin
//import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
//registerPlugin(FilePondPluginFileValidateType);


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    SignupComponent,
    SigninComponent,
    OnboardingComponent,
    ManageprofileComponent,
    AboutComponent,
    ProjectComponent,
    ExperienceComponent,
    EducationComponent,
    AwardComponent,
    SkillComponent,
    ContactComponent,
    FooterComponent,
    EditAboutComponent,
    AddProjectComponent,
    AddExperienceComponent,
    AddEducationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatSelectModule,
    FilePondModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
