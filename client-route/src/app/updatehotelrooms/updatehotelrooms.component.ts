import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService} from '../hotel.service';
import { ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-updatehotelrooms',
  templateUrl: './updatehotelrooms.component.html',
  styleUrls: ['./updatehotelrooms.component.css'],
  providers: [HotelService],
  })
  export class UpdatehotelroomsComponent implements OnInit {
  
  roomType: String;
  description: true;
  number: Number;
  image: String;
  price: Number;
  error: false;
  hotelId: String;
  roomId: String;
  constructor(private route: ActivatedRoute, private hotelService: HotelService, private router: Router) { }

  onUploadFinished(event) {
    this.image = JSON.parse(event.serverResponse._body).filename;
    }
  updateRoom() {
    // console.log(this.first_name);
    const room = {
      roomType: this.roomType,
      description: this.description,
      number: this.number,
      price: this.price,
      photos: this.image,
      hotelId: this.hotelId,
      roomId: this.roomId
      };
      this.hotelService.updateRoom(room)
      .subscribe(message => {
          if ( message.msg) {
            this.router.navigate(['/home']);
          } else {
            this.error = message.msg;
          }
      });
      }


  ngOnInit() {
    const ids = this.route.snapshot.params['id'];
    const id = ids.split('_');
    this.hotelId = id[0];
    this.roomId = id[1];
  }

}
