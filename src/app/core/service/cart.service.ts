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

  getUserLocalCart() {
    return new Promise((resolve, reject) => {
      let localCart : CartItem[] = JSON.parse(localStorage.getItem('userLocalCart'));
      if (localCart) {
        return resolve(localCart);
      } else {
        return resolve(new Array<CartItem>());
      }
    });
  }

  addItemToCart(user_id : number, movie_id : number) {
    let params = new HttpParams().set("user_id", user_id.toString()).set("movie_id", movie_id.toString());
    return this.http.get<any>(`${environment.apiUrl}/user/cart/add`, {params : params});
  }

  addItemToLocalCart(movie_id : number) {
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('userLocalCart')) {
        let localCart : CartItem[] = new Array<CartItem>();
        localStorage.setItem('userLocalCart', JSON.stringify(localCart));
      }
      let localCart : CartItem[] = JSON.parse(localStorage.getItem('userLocalCart'));
      let item = localCart.find(x => x.embeddedKeyMovieUser.movieId === movie_id);
      if (item) {
        item.movieUserCartCount += 1;
      } else {
        item = {
          embeddedKeyMovieUser : {
            movieId : movie_id,
            userId : -1
          },
          movieUserCartCount : 1
        };
        localCart.push(item);
      }
      localStorage.setItem('userLocalCart', JSON.stringify(localCart));
      return resolve();
    });
  }

  buyCart(user_id : number) {
    return this.http.get<any>(`${environment.apiUrl}/user/cart/buy/${user_id}`);
  }

  mergeCarts(user_id : number) {
    return new Promise((resolve, reject) => {
      let localCart : CartItem[] = JSON.parse(localStorage.getItem('userLocalCart'));
      localStorage.removeItem('userLocalCart');
      if (localCart) {
        let params = new HttpParams().set("user_id", user_id.toString()).set("local_cart", JSON.stringify(localCart));
        this.http.get<any>(`${environment.apiUrl}/user/cart/merge`, {params : params})
        .pipe()
        .subscribe(
          data => {
            return resolve();
          }
        );
      } else {
        return resolve();
      }
    });
  }
}
