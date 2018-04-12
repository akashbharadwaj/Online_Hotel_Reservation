import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import { Contact } from './contact';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(private http: Http) { }
  userLogin(login) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/login', login, {headers: headers})
      .map(res => res.json());
  }
  getAccess() {
    return this.http.get('http://localhost:3000/api/userAccess')
      .map(res => res.json());
  }

  userSignUp(signUp) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/signUpUnameExists', signUp, {headers: headers})
      .map(res => res.json());
  }

  retrieveBookings(userName) {
    return this.http.get('http://localhost:3000/api/profile/bookings/' + userName, {params: {userName: userName}})
      .map(res => res.json());
  }

  retrieveWishList(userName) {
    return this.http.get('http://localhost:3000/api/profile/wishList/' + userName, {params: {userName: userName}})
      .map(res => res.json());
  }
}
