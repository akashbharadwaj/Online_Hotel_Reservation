import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService} from '../hotel.service';
@Component({
  selector: 'app-newhotel',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css'],
  providers: [HotelService]
})
export class NewRoomComponent implements OnInit {
  hotelName: String;
  type: String;
  description: String;
  number: Number;
  image: String;
  price: Number;
  error = false;
  formError = false;
  newHotelRoomSuccess = false;
  constructor(private hotelService: HotelService, private router: Router) { }

  onUploadFinished(event) {
    this.image = JSON.parse(event.serverResponse._body).filename;
    }
  createNewRoom() {
      this.error = false;
      this.formError = false;
      this.newHotelRoomSuccess = false;
    // console.log(this.first_name);
    const room = {
      hotelName: this.hotelName,
      type: this.type,
      description: this.description,
      number: this.number,
      price: this.price,
      photos: this.image
      };
      if (this.hotelName === undefined || this.type === undefined || this.description === undefined ||
        this.number === undefined || this.image === undefined || this.price === undefined) {
        console.log('Hotel' + this.hotelName + 'Type' + this.type + 'Descrip' + this.description +
         'number' + this.number +  'image' + this.image + 'price' + this.price);
        this.formError = true;
      } else {
      this.hotelService.createNewRoom(room)
      .subscribe(message => {
          if ( !message.msg) {
            this.error = true;
          } else {
            this.newHotelRoomSuccess = true;
            // this.router.navigate(['/home']);
          }
      });
      }
    }


  ngOnInit() {
  }

}
