import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HotelService} from '../hotel.service';
import { RoomDetails } from '../RoomDetails';
import { UserService} from '../user.service';
import { Router } from '@angular/router';
// import { DatepickerOptions} from 'ng2-datepicker';
@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css'],
  providers: [HotelService, UserService]
})
export class AvailabilityComponent implements OnInit {
  // @Input() message: String;
  roomID: String;
  hotelID: String;
  startDate: String;
  endDate: String;
  access = false;
  message = false;
  quant: Number;
  userName: String;
  quantity: Number;
  messageCheckout = false;
  /*
  const ids = this.route.snapshot.params['id'];
    const id = ids.split('_');
    this.hotelID = id[0];
    this.roomID = id[1];
    */

  constructor(private route: ActivatedRoute, private hotelService: HotelService,
    private userService: UserService, private router: Router) {
      console.log(this.userName);
    }
    checkAvailability() {
      console.log(this.startDate);
      console.log(this.hotelID);
      const check = {
        startDate: this.startDate,
        endDate: this.endDate,
        hotelID: this.hotelID,
        roomID: this.roomID
        };
        this.hotelService.checkAvailability(check)
        .subscribe(message => {
            if ( message.num >= 0) {
              this.quant = message.num;
              this.message = true;
              console.log(this.message);
              // this.router.navigate(['/home']);
          } else {
            // this.message1 = message;
          }
        });
    }
    checkout() {
      const check = {
        quantity: this.quantity,
        userName: this.userName,
        };
        this.hotelService.checkout(check)
        .subscribe(message => {
            if ( message.checkout) {
              this.messageCheckout = message.checkout;
              // this.router.navigate(['/home']);
          } else {
            // this.message1 = message;
          }
        });
    }
  ngOnInit() {
    // this.hotelService.retrieveHotelRooms(hotels)
    // console.log(id[0]);
    const ids = this.route.snapshot.params['id'];
    const id = ids.split('_');
    this.hotelID = id[0];
    this.roomID = id[1];
    this.userService.getAccess()
                .subscribe( access => {
                  this.access = access.access;
                  this.userName = access.uName;
                });
  }

}

