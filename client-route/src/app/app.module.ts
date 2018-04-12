import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NewhotelComponent } from './newhotel/newhotel.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageUploadModule } from 'angular2-image-upload';
import { NewRoomComponent } from './new-room/new-room.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { DisplayRoomsComponent } from './display-rooms/display-rooms.component';
import { AvailabilityComponent } from './availability/availability.component';
import { NgDatepickerModule} from 'ng2-datepicker';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ListbookingsComponent } from './listbookings/listbookings.component';
import { UpdatehotelComponent } from './updatehotel/updatehotel.component';
import { UpdatehotelroomsComponent } from './updatehotelrooms/updatehotelrooms.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NewhotelComponent,
    NewRoomComponent,
    SanitizeHtmlPipe,
    DisplayRoomsComponent,
    AvailabilityComponent,
    UserProfileComponent,
    ListbookingsComponent,
    UpdatehotelComponent,
    UpdatehotelroomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    ImageUploadModule.forRoot(),
    NgxPaginationModule,
    NgDatepickerModule,
    CommonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
