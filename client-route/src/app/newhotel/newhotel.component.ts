import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService} from '../hotel.service';
@Component({
  selector: 'app-newhotel',
  templateUrl: './newhotel.component.html',
  styleUrls: ['./newhotel.component.css'],
  providers: [HotelService]
})
export class NewhotelComponent implements OnInit {
  hotelName: String;
  location: String;
  description: true;
  services: String;
  image: String;
  error: false;
  constructor(private hotelService: HotelService, private router: Router) { }

  onUploadFinished(event) {
    this.image = JSON.parse(event.serverResponse._body).filename;
    }
    createNewHotel() {
    // console.log(this.first_name);
    const hotel = {
      hotelName: this.hotelName,
      location: this.location,
      description: this.description,
      services: this.services,
      photos: this.image
      };
      this.hotelService.createNewHotel(hotel)
      .subscribe(message => {
          if ( message.msg) {
            this.error = message.msg;
          } else {
            this.router.navigate(['/home']);
          }
      });
      }


  ngOnInit() {
  }

}
