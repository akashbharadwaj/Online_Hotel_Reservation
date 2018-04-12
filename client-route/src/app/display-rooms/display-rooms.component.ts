import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HotelService} from '../hotel.service';
import { RoomDetails } from '../RoomDetails';
import { UserService} from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-display-rooms',
  templateUrl: './display-rooms.component.html',
  styleUrls: ['./display-rooms.component.css'],
  providers: [HotelService, UserService]
})
export class DisplayRoomsComponent implements OnInit {
  hotelId: String;
  access = false;
  roomDetails: RoomDetails[];
  constructor(private route: ActivatedRoute, private hotelService: HotelService,
    private userService: UserService, private router: Router) { }

  onSelect(rooms) {
    console.log('inside select');
    console.log(rooms._id);

    this.router.navigate(['/availability', this.hotelId + '_' + rooms._id]);
  }
  deleteRoom(rooms) {
    const ids = this.hotelId + '_' + rooms;
    console.log();
    const roomDetails = this.roomDetails;
    this.hotelService.deleteRooms(ids)
      .subscribe(data => {
        console.log('data.n: ' + data.n);

            for (let i = 0; i < roomDetails.length; i++) {
              if (roomDetails[i]._id === rooms) {
                roomDetails.splice(i, 1);
              }
            }

      });
  }
  updateHotels(rooms) {
    console.log('inside update');
    console.log(rooms);
    const id = this.hotelId + '_' + rooms;
    this.router.navigate(['/updateRooms', id]);
  }
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.hotelId = id;
      console.log(this.hotelId);
      // console.log("comes here");
      this.hotelService.retrieveHotelRooms(this.hotelId)
      .subscribe(message => {
          console.log(message.rooms.length);
            this.roomDetails = message.rooms;
            console.log(this.roomDetails.length);
            for (let i = 0; i < this.roomDetails.length; i++) {
              console.log('inside');
              this.hotelService.fetchImageRooms(this.roomDetails[i].photos).subscribe(data => {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                  console.log(reader.result);
                  this.roomDetails[i].photos = reader.result;
                  }, false);
                if (data) {
                  console.log(data);
                  reader.readAsDataURL(data);
                }
                 // this.isImageLoading = false;
             }, error => {
              // this.isImageLoading = false;
               console.log(error);
             });
            }
      });
      this.userService.getAccess()
      .subscribe( access =>
        this.access = access.access);
  }

}
