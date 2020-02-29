
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/user/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    changeUserDetails(userId : number, userLastname : string, userFirstname : string, userLogin : string, userEmail : string, password : string) {
        return this.http.post<any>(`${environment.apiUrl}/user/changeuserdetails`, {userId,password,userLastname,userFirstname,userLogin,userEmail});
    }

    changePassword(userId : number,password :string) {
        return this.http.post<any>(`${environment.apiUrl}/user/changepassword`, { userId, password });
    }

    forgetPassword(user_id : number,user_email :string) {
        return this.http.post<any>(`${environment.apiUrl}/forgetPassword`, { user_id, user_email });
    }

    forgetPasswordEmailOnly(user_email :string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/credentialsrecovery`, { user_email });
    }
    
    checkUserPassword(userId : number,password :string) {
        let params = new HttpParams().set("userId",userId.toString()).set("password", password);
        return this.http.get<any>(`${environment.apiUrl}/user/checkuserpassword`, {params: params});
    }
}