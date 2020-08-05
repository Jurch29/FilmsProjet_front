import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/shared/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  getUserOrders(user_id : number) {
    return this.http.get<any>(`${environment.apiUrl}/user/orders/${user_id}`);
  }
}
