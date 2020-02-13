
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }
    changeUserDetails(user_id : number,user_lastname : string ,user_firstname :string, user_login : string,user_email :string) {
        return this.http.post<any>(`${environment.apiUrl}/changeUserDetails`, { user_id,user_lastname,user_firstname,user_login, user_email });
    }
    changePassword(user_id : number,user_password :string) {
        return this.http.post<any>(`${environment.apiUrl}/changePassword`, { user_id, user_password });
    }
    forgetPassword(user_id : number,user_email :string) {
        return this.http.post<any>(`${environment.apiUrl}/forgetPassword`, { user_id, user_email });
    }
    forgetPasswordEmailOnly(user_email :string) {
        return this.http.post<any>(`${environment.apiUrl}/forgetPasswordEmailOnly`, { user_email });
    }
    checkUserPassword(user_id : number,user_newPassword :string) {
        return this.http.post<any>(`${environment.apiUrl}/checkUserPassword`, { user_id, user_newPassword });
    }
}