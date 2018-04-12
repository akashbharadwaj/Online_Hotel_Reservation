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

  addToWishListUser(hotelName) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/hotel/addToWishList', hotelName, {headers: headers})
      .map(res => res.json());
  }

  listBookingsByHotelName(hotelName) {
    console.log('Booking');
    return this.http.get('http://localhost:3000/api/hotel/bookings', {params: {name: hotelName}})
      .map(res => res.json());
  }

  deleteHotels(id) {
    console.log(id);
    return this.http.delete('http://localhost:3000/api/hotel/delete/' + id)
      .map(res => res.json());
  }

  deleteRooms(id) {
    console.log(id);
    const ids = id.split('_');
    console.log(ids[0] + '/' + ids[1]);
    return this.http.delete('http://localhost:3000/api/hotels/room/delete/' + ids[0] + '/' + ids[1])
      .map(res => res.json());
  }

  updateHotel(hotel) {
    console.log(hotel);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/hotel/update', hotel, {headers: headers})
      .map(res => res.json());
  }

  updateRoom(room) {
    console.log(room);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/hotel/room/update', room, {headers: headers})
      .map(res => res.json());
  }

  removeHotelFromWishList(hotelName) {
    console.log(hotelName);
    return this.http.delete('http://localhost:3000/api/profile/wishList/delete/' + hotelName)
      .map(res => res.json());
  }
  cancelBookings(id) {
    console.log(id);
    // const ids = id.split('_');
    // console.log(ids[0] + '/' + ids[1]);
    return this.http.delete('http://localhost:3000/api/hotel/booking/cancel/' + id)
      .map(res => res.json());
  }
}
