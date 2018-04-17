import { Component, OnInit } from '@angular/core';
import { UserService} from './user.service';
import { Subject } from 'rxjs/Subject';
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
  name: String;
  constructor( private userService: UserService) { }
  logout() {
    this.userService.logout()
      .subscribe( logout => {
        this.userName = '';
        this.access = false;
        this.name = '';
      });
  }
  ngOnInit() {
    this.userService.getAccess()
      .subscribe( access => {
        this.access = access.access;
        this.userName = access.uName;
        this.name = access.Name;
      });

  }
}
