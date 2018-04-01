import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }
    // console.log(this.userService.getValue());
    access;
    // console.log(LoginComponent.access);
  ngOnInit() {
    
    this.userService.getAccess()
      .subscribe( access =>
        this.access = access.access);
        
  }

}
