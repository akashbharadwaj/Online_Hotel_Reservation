import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService} from '../hotel.service';
import { BookingDetails } from '../bookingDetails';
// import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-listbookings',
  templateUrl: './listbookings.component.html',
  styleUrls: ['./listbookings.component.css'],
  providers: [HotelService]
})
export class ListbookingsComponent implements OnInit {
  hotelName: String;
  bookingDetails: BookingDetails[];
  flag = false;
  date = new Date();
  // toda = new Date(this.today);
  constructor(private hotelService: HotelService, private router: Router) { }

  listBookings() {
    const HotelName = {
      searchKey: this.hotelName,
      };
      // console.log("Here");
    // console.log('Today: ' + this.today);
    this.hotelService.listBookingsByHotelName(HotelName.searchKey)
      .subscribe(message => {
        // console.log("Here1");

        this.bookingDetails = message.booking;
        this.flag = true;
      });
  }
  cancelBooking(id) {
    console.log(id);
    const bookingDetails = this.bookingDetails;
    this.hotelService.cancelBookings(id)
      .subscribe(data => {
        if (data.msg) {
          console.log('Data' + data.n);
            for (let i = 0; i < bookingDetails.length; i++) {
              if (bookingDetails[i].bookingId === id) {
                bookingDetails.splice(i, 1);
              }
            }
        }
      });
  }
  ngOnInit() {
  }
}
