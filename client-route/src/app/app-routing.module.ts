import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NewhotelComponent } from './newhotel/newhotel.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { DisplayRoomsComponent } from './display-rooms/display-rooms.component';
import { AvailabilityComponent } from './availability/availability.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ListbookingsComponent } from './listbookings/listbookings.component';
import { UpdatehotelComponent } from './updatehotel/updatehotel.component';
import { UpdatehotelroomsComponent } from './updatehotelrooms/updatehotelrooms.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signUp', component: SignupComponent},
  {path: 'newHotel', component: NewhotelComponent},
  {path: 'newRoom', component: NewRoomComponent},
  {path: 'newRoom', component: NewRoomComponent},
  {path: 'displayRoom/:id', component: DisplayRoomsComponent},
  {path: 'userprofile', component: UserProfileComponent},
  {path: 'availability/:id', component: AvailabilityComponent},
  {path: 'listBookings', component: ListbookingsComponent},
  {path: 'updateHotel/:id', component: UpdatehotelComponent},
  {path: 'updateRooms/:id', component: UpdatehotelroomsComponent},
  {path: '**', component: LandingPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DisplayRoomsComponent];
