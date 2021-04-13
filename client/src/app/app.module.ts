import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebapiRequestInterceptor } from './services/webapi-request-interceptor.service';
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
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ManageprofileComponent } from './manageprofile/manageprofile.component';
import { AboutComponent } from './manageprofile/categories/about/about.component';
import { ProjectComponent } from './manageprofile/categories/project/project.component';
import { ExperienceComponent } from './manageprofile/categories/experience/experience.component';
import { ContactComponent } from './manageprofile/categories/contact/contact.component';
import { ContactDialogComponent } from './manageprofile/categories/contact/dialog/contact-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { MatListModule } from '@angular/material/list';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EducationComponent } from './manageprofile/categories/education/education.component';
import { EducationDialogComponent } from './manageprofile/categories/education/dialog/education-dialog.component';
import { AboutDialogComponent } from './manageprofile/categories/about/dialog/about-dialog.component';
import { ProjectDialogComponent } from './manageprofile/categories/project/dialog/project-dialog.component';
import { ExperienceDialogComponent } from './manageprofile/categories/experience/dialog/experience-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PreviewProfileComponent } from './preview-profile/preview-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsDialogComponent } from './settings/dialog/settings-dialog.component';

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
    ContactComponent,
    ContactDialogComponent,
    FooterComponent,
    ExperienceDialogComponent,
    EducationComponent,
    EducationDialogComponent,
    AboutDialogComponent,
    ProjectDialogComponent,
    PreviewProfileComponent,
    SettingsComponent,
    SettingsDialogComponent,
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
    MatListModule,
    ClipboardModule,
    ImageCropperModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WebapiRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
