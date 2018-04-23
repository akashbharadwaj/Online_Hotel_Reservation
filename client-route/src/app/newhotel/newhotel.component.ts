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
  description: String;
  services: String;
  image: String;
  formError = false;
  error = false;
  newHotelSuccess = false;
  constructor(private hotelService: HotelService, private router: Router) { }

  onUploadFinished(event) {
    this.image = JSON.parse(event.serverResponse._body).filename;
    }
    createNewHotel() {
    // console.log(this.first_name);
    this.formError = false;
    this.error = false;
    this.newHotelSuccess = false;
    const hotel = {
      hotelName: this.hotelName,
      location: this.location,
      description: this.description,
      services: this.services,
      photos: this.image
      };
      console.log('HOtelname' + this.hotelName);
      if (this.hotelName === undefined || this.location === undefined || this.description === undefined ||
        this.services === undefined || this.image === undefined) {
        console.log('nblank');
        this.formError = true;
      } else {
      this.hotelService.createNewHotel(hotel)
      .subscribe(message => {
          if ( !message.msg) {
            this.error = true;
          } else {
            this.newHotelSuccess = true;
            // this.router.navigate(['/home']);
          }
      });
      }
      }


  ngOnInit() {
  }

}
