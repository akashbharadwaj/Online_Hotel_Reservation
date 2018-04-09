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
  description: true;
  number: Number;
  image: String;
  price: Number;
  error: false;
  constructor(private hotelService: HotelService, private router: Router) { }

  onUploadFinished(event) {
    this.image = JSON.parse(event.serverResponse._body).filename;
    }
    createNewRoom() {
    // console.log(this.first_name);
    const room = {
      hotelName: this.hotelName,
      type: this.type,
      description: this.description,
      number: this.number,
      price: this.price,
      photos: this.image
      };
      this.hotelService.createNewRoom(room)
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
