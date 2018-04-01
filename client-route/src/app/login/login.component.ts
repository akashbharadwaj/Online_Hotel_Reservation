import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';
import { Router } from '@angular/router';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
// import { Globals } from '../globals';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  userName: String;
  password: String;
  message: true;
  // access: false;
  login() {
    // console.log(this.first_name);
    const login = {
      userName: this.userName,
      password: this.password
      };
    this.userService.userLogin(login)
      .subscribe(message => {
          if ( message.msg) {
            this.router.navigate(['/home']);
        } else {
          this.message = message;
        }
      });
  }

  ngOnInit() {
  }

}
