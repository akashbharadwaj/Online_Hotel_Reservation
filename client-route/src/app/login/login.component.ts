import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';
import { Router } from '@angular/router';

declare var $: any;
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
  message1 = true;
  access = false;
  message: String;
  homeButton = false;
  userNameError = false;
  passwordError = false;

  login() {
    this.passwordError = false;
    this.userNameError = false;
    this.message1 = true;
    // console.log(this.first_name);
    const login = {
      userName: this.userName,
      password: this.password
      };
    const email = $('#userName').val();
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{3,3})?$/;
    if ((!(emailReg.test(email))) || (email === '') || (!($('#password').val().length >= 8))) {
      if ((!(emailReg.test(email))) || (email === '')) {
        console.log('email');
        this.userNameError = true;
      }
      if ((!($('#password').val().length >= 8))) {
        console.log($('#password').val().length);
        this.passwordError = true;
      }
    } else {
    this.userService.userLogin(login)
      .subscribe(message => {
          if ( message.msg) {
            this.homeButton = true;
            this.message = this.userName;
            this.userService.getAccess()
              .subscribe( access =>
                this.access = access.access);
                // this.router.navigate(['/home']);
        } else {
          this.message1 = message.msg;
          console.log('incorrect username' + message.msg);
        }
      });
    }
  }

  ngOnInit() {
    this.userService.getAccess()
      .subscribe( access =>
        this.access = access.access);
        // this.router.navigate(['/home']);
  }

}
