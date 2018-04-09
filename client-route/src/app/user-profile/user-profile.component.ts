import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';
import { HotelService} from '../hotel.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserService, HotelService]
})
export class UserProfileComponent implements OnInit {

  userName: String;
  name: String;
  constructor(private userService: UserService, private hotelService: HotelService) { }

  ngOnInit() {
    this.userService.getAccess()
      .subscribe( access => {
        // this.access = access.access;
        this.userName = access.uName;
        this.name = access.Name;
    });
    /*
    this.userService.fetchName(this.userName)
      .subscribe(message => {
          if ( message.msg) {
            this.error = message.msg;
          } else {
            this.router.navigate(['/home']);
          }
      });
      */
  }

}
