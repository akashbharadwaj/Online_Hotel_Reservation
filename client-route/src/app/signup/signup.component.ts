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
  homeButton = false;
  nameError = false;
  constructor( private userService: UserService, private router: Router) { }

  signUp() {
    this.passwordError = false;
    this.emailError = false;
    this.error = false;
    this.nameError = false;
    const signUp = {
      email: this.email,
      password: this.password,
      fullName: this.fullName
      };
    const email = $('#email').val();
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{3,3})?$/;
    const passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    // (!($('#password').val().length >= 8))
    console.log('Paas' + $('#password').val());
    if ((!(emailReg.test(email))) || (email === '') || (!(passwordReg.test($('#password').val()))) || ($('#password').val() === '')
    || ($('#fullName').val() === '')) {
      if ((!(emailReg.test(email))) || (email === '')) {
        console.log('email');
        this.emailError = true;
      }
      if ((!(passwordReg.test($('#password').val()))) || ($('#password').val() === '')) {
        console.log($('#password').val().length);
        this.passwordError = true;
      }

      if ($('#fullName').val() === '') {
        this.nameError = true;
      }
    } else {
      console.log('signUp enters');
      this.userService.userSignUp(signUp)
        .subscribe(message => {
          if ( message.msg) {
            // this.router.navigate(['/home']);
            this.homeButton = true;

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
