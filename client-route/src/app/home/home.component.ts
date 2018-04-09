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
  onSelect(hotels) {
    console.log('inside select');
    console.log(hotels._id);

    this.router.navigate(['/displayRoom', hotels._id]);
  }
  ngOnInit() {
    this.userService.getAccess()
      .subscribe( access =>
        this.access = access.access);
  }

}
