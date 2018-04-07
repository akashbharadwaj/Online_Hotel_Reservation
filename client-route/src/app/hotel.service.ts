import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
@Injectable()
export class HotelService {

  constructor(private http: Http) { }

  createNewHotel(hotel) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/hotel/new', hotel, {headers: headers})
      .map(res => res.json());
  }
}
