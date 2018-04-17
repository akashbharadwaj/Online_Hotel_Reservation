import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  emailError = false;
  passwordError = false;
  email: String;
  fullName: String;
  password: String;
  error = false;

  constructor( private userService: UserService, private router: Router) { }

  signUp() {
    this.passwordError = false;
    this.emailError = false;
    const signUp = {
      email: this.email,
      password: this.password,
      fullName: this.fullName
      };
    const email = $('#email').val();
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{3,3})?$/;
    if ((!(emailReg.test(email))) || (email === '') || (!($('#password').val().length >= 8))) {
      if ((!(emailReg.test(email))) || (email === '')) {
        console.log('email');
        this.emailError = true;
      }
      if ((!($('#password').val().length >= 8))) {
        console.log($('#password').val().length);
        this.passwordError = true;
      }
    } else {
      console.log('signUp enters');
      this.userService.userSignUp(signUp)
        .subscribe(message => {
          if ( message.msg) {
            this.router.navigate(['/home']);

        } else {
          // this.message = message;
          this.error = true;
        }
      });
    }
  }
  ngOnInit() {
  }

}
