import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class HotelService {
  hocity: String;
  constructor(private http: Http) { }

  createNewHotel(hotel) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/hotel/new', hotel, {headers: headers})
      .map(res => res.json());
  }

  retrieveHotels(hotels) {
    // const data = {search: hotels };
    // this.httpClient.get<any>(apiUrl, {params: data});
    // const myParams = new HttpParams();
    // myParams.append('hocity', hotels);
    // const options = new RequestOptions ({params: myParams });
    console.log('Options' + hotels);
    return this.http.get('http://localhost:3000/api/hotels/list', {params: {name: hotels}})
      .map(res => res.json());
  }
  createNewRoom(room) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/hotel/room/new', room, {headers: headers})
      .map(res => res.json());
  }
  fetchImage(name) {
    console.log(name);
    return this.http.get('http://localhost:3000/upload/' + name, { responseType: ResponseContentType.Blob })
      .map((res) => res.blob());
  }

  retrieveHotelRooms(hotelID) {
    return this.http.get('http://localhost:3000/api/hotel/' + hotelID, {params: {id: hotelID}})
      .map(res => res.json());
  }

  fetchImageRooms(name) {
    console.log(name);
    return this.http.get('http://localhost:3000/upload/room/' + name, { responseType: ResponseContentType.Blob })
      .map((res) => res.blob());
  }

  checkAvailability(check) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/hotel/room/checkAvalability', check, {headers: headers})
      .map(res => res.json());
  }

  checkout(check) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/hotel/room/checkOut', check, {headers: headers})
      .map(res => res.json());
  }
}
