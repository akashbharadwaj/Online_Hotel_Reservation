import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  access = false;
  constructor(private userService: UserService) { }
    // console.log(this.userService.getValue());
    // console.log(LoginComponent.access);
  ngOnInit() {
    this.userService.getAccess()
      .subscribe( access =>
        this.access = access.access);
  }

}
