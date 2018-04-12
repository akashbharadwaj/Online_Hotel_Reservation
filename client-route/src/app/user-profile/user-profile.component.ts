import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';
import { HotelService} from '../hotel.service';
import { BookingDetails } from '../bookingDetails';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserService, HotelService]
})
export class UserProfileComponent implements OnInit {

  userName: String;
  name: String;
  bookingDetails: BookingDetails[];
  flag = false;
  flagWish = false;
  wishList: String[];
  constructor(private userService: UserService, private hotelService: HotelService) { }

  retrieveBookings() {

      this.userService.retrieveBookings(this.userName)
      .subscribe(message => {
          // console.log(message.List.length);
            this.bookingDetails = message.bookings;
            console.log(this.bookingDetails);
            this.flag = true;
            this.flagWish = false;
     });

  }
  retrieveWishList() {
    this.userService.retrieveWishList(this.userName)
      .subscribe(message => {
          // console.log(message.List.length);
            this.wishList = message.wishlist;
            console.log(this.wishList);
            this.flagWish = true;
            this.flag = false;
     });
  }
  removeHotel(hotelName) {
    console.log(hotelName);
    const wishList = this.wishList;
    this.hotelService.removeHotelFromWishList(hotelName)
      .subscribe(data => {
        console.log('Data' + data.n);
            for (let i = 0; i < wishList.length; i++) {
              if (wishList[i] === hotelName) {
                wishList.splice(i, 1);
              }
            }
      });
  }
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
