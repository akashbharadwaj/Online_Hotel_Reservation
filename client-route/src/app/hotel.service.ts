import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class HotelService {
  hocity: String;
  constructor(private http: Http) { }
// np
  createNewHotel(hotel) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/hotels', hotel, {headers: headers})
      .map(res => res.json());
  }
// np
  retrieveHotels(hotels) {
    // const data = {search: hotels };
    // this.httpClient.get<any>(apiUrl, {params: data});
    // const myParams = new HttpParams();
    // myParams.append('hocity', hotels);
    // const options = new RequestOptions ({params: myParams });
    console.log('Options' + hotels);
    return this.http.get('http://localhost:3000/api/hotels', {params: {name: hotels}})
      .map(res => res.json());
  }
  // np
  createNewRoom(room) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/hotels/rooms', room, {headers: headers})
      .map(res => res.json());
  }
  fetchImage(name) {
    console.log(name);
    return this.http.get('http://localhost:3000/upload/' + name, { responseType: ResponseContentType.Blob })
      .map((res) => res.blob());
  }
// np
  retrieveHotelRooms(hotelID) {
    return this.http.get('http://localhost:3000/api/hotels/rooms/' + hotelID, {params: {id: hotelID}})
      .map(res => res.json());
  }

  fetchImageRooms(name) {
    console.log(name);
    return this.http.get('http://localhost:3000/upload/room/' + name, { responseType: ResponseContentType.Blob })
      .map((res) => res.blob());
  }
// np
  checkAvailability(check) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/orders/hotels/rooms', check, {headers: headers})
      .map(res => res.json());
  }
// np
  checkout(check) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/orders', check, {headers: headers})
      .map(res => res.json());
  }
// np
  addToWishListUser(hotelName) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/wishlist', hotelName, {headers: headers})
      .map(res => res.json());
  }
// np
  listBookingsByHotelName(hotelName) {
    console.log('Booking');
    return this.http.get('http://localhost:3000/api/orders', {params: {name: hotelName}})
      .map(res => res.json());
  }
// np
  deleteHotels(id) {
    console.log(id);
    return this.http.delete('http://localhost:3000/api/hotels/' + id)
      .map(res => res.json());
  }
// np
  deleteRooms(id) {
    console.log(id);
    const ids = id.split('_');
    console.log(ids[0] + '/' + ids[1]);
    return this.http.delete('http://localhost:3000/api/hotels/rooms/' + ids[0] + '/' + ids[1])
      .map(res => res.json());
  }
// np
  updateHotel(hotel) {
    console.log(hotel);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/hotels', hotel, {headers: headers})
      .map(res => res.json());
  }
// np
  updateRoom(room) {
    console.log(room);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/hotels/rooms', room, {headers: headers})
      .map(res => res.json());
  }
// np
  removeHotelFromWishList(hotelName) {
    console.log(hotelName);
    return this.http.delete('http://localhost:3000/api/wishlist/' + hotelName)
      .map(res => res.json());
  }
  // np
  cancelBookings(id) {
    console.log(id);
    // const ids = id.split('_');
    // console.log(ids[0] + '/' + ids[1]);
    return this.http.delete('http://localhost:3000/api/orders/' + id)
      .map(res => res.json());
  }
}
