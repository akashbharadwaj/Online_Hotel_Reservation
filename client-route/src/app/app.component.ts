import { Component, OnInit } from '@angular/core';
import { UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  title = 'app';
  access = false;
  userName: String;
  constructor( private userService: UserService) { }

  ngOnInit() {
    this.userService.getAccess()
      .subscribe( access => {
        this.access = access.access;
        this.userName = access.uName;
      }
        );
  }
}
