import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CartItem } from 'src/app/shared/models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getUserCart(user_id : number) {
    return this.http.get<CartItem[]>(`${environment.apiUrl}/user/cart/${user_id}`);
  }

  addItemToCart(user_id : number, movie_id : number) {
    let params = new HttpParams().set("user_id", user_id.toString()).set("movie_id", movie_id.toString());
    return this.http.get<any>(`${environment.apiUrl}/user/cart/add`, {params : params});
  }
}
