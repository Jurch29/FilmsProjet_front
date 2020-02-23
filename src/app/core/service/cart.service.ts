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

  addItemToCart(userId : number, movieId : number) {
    return this.http.post<any>(`${environment.apiUrl}/user/additemtocart`, {movieId, userId});
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

  removeItemToCart(userId : number, movieId : number) {
    return this.http.post<any>(`${environment.apiUrl}/user/removeitemtocart`, {movieId, userId});
  }

  removeItemToLocalCart(movie_id : number) {
    return new Promise((resolve, reject) => {
      let localCart : CartItem[] = JSON.parse(localStorage.getItem('userLocalCart'));
      let item = localCart.find(x => x.embeddedKeyMovieUser.movieId === movie_id);
      if (item.movieUserCartCount == 1) {
        localCart = localCart.filter(function (element) {
          return element.embeddedKeyMovieUser.movieId != movie_id;
      });
      } else {
        item.movieUserCartCount -= 1;
      }
      localStorage.setItem('userLocalCart', JSON.stringify(localCart));
      resolve();
    });
  }

  buyCart(userId : number) {
    return this.http.post<any>(`${environment.apiUrl}/user/buycart`, { userId });
  }

  mergeCarts(userId : number) {
    return new Promise((resolve, reject) => {
      let localCart : CartItem[] = JSON.parse(localStorage.getItem('userLocalCart'));
      localStorage.removeItem('userLocalCart');
      if (localCart) {
        return this.http.post<any>(`${environment.apiUrl}/user/cartmerge`, { userId, localCart })
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
