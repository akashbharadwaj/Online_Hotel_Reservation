import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService} from '../hotel.service';
import { ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-updatehotel',
  templateUrl: './updatehotel.component.html',
  styleUrls: ['./updatehotel.component.css'],
  providers: [HotelService]
})
export class UpdatehotelComponent implements OnInit {
  hotelName: String;
  location: String;
  description: true;
  services: String;
  image: String;
  error: false;
  hotelId: String;
  updateHotelSuccess = false;
  constructor(private route: ActivatedRoute, private hotelService: HotelService, private router: Router) { }

  onUploadFinished(event) {
    this.image = JSON.parse(event.serverResponse._body).filename;
    }
    updateHotel() {
      this.error = false;
      this.updateHotelSuccess = false;
    // console.log(this.first_name);
    const hotel = {
      hotelId: this.hotelId,
      hotelName: this.hotelName,
      location: this.location,
      description: this.description,
      services: this.services,
      photos: this.image
      };
      this.hotelService.updateHotel(hotel)
      .subscribe(message => {
          if ( message.msg) {
            this.updateHotelSuccess = true;
            // this.router.navigate(['/home']);
          } else {
            this.error = message.msg;
          }
      });
      }


  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.hotelId = id;
    console.log('Outside update: ' + this.hotelId);
  }

}
