import { Component, OnInit, SecurityContext } from '@angular/core';
import { UserService} from '../user.service';
import { HotelService} from '../hotel.service';
import { Router } from '@angular/router';
import { HotelList } from '../HotelList';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, HotelService]
})
export class HomeComponent implements OnInit {
  access = false;
  searchKey: String;
  hotelList: HotelList[];
  hotelAdd = false;
  constructor(private userService: UserService, private hotelService: HotelService, private router: Router) { }
    // console.log(this.userService.getValue());
    // console.log(LoginComponent.access)

  retrieveHotels() {

    const hotels = {
      searchKey: this.searchKey,
      };
      this.hotelService.retrieveHotels(hotels.searchKey)
      .subscribe(message => {
          console.log(message.List.length);
            this.hotelList = message.List;
            console.log(this.hotelList.length);
            for (let i = 0; i < this.hotelList.length; i++) {
              console.log('inside');
              this.hotelService.fetchImage(this.hotelList[i].photos).subscribe(data => {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                  console.log(reader.result);
                  this.hotelList[i].photos = reader.result;
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

  }
  addToWishList(hotelName1) {
    const hotels = {
      hotelName: hotelName1,
      };
    console.log(hotelName1);
    this.hotelService.addToWishListUser(hotels)
    .subscribe(message => {
      // console.log(message.List.length);
        this.hotelAdd = message.hotelAdd;
    });
  }
  deleteHotel(id) {
    console.log(id);
    const hotelList = this.hotelList;
    this.hotelService.deleteHotels(id)
      .subscribe(data => {
        console.log('Data' + data.n);
            for (let i = 0; i < hotelList.length; i++) {
              if (hotelList[i]._id === id) {
                hotelList.splice(i, 1);
              }
            }
      });
  }
  onSelect(hotels) {
    console.log('inside select');
    console.log(hotels._id);

    this.router.navigate(['/displayRoom', hotels._id]);
  }

  updateHotels(id) {
    console.log('inside update');
    console.log(id);
    this.router.navigate(['/updateHotel', id]);
  }
  ngOnInit() {
    this.userService.getAccess()
      .subscribe( access =>
        this.access = access.access);
  }

}
