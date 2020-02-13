import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user';
import { UserActivation } from '../../shared/models/user-activation';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User> = undefined;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    updateUser(user : User) {
        localStorage.setItem('currentUser',JSON.stringify(user));
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    validateUser(userActivation: UserActivation) {
        let params = new HttpParams().set("user_id",userActivation.user_id.toString()).set("user_activation_code", userActivation.user_activation_code); //Create new HttpParams
        return this.http.get<any>(`${environment.apiUrl}/auth/activation`, {params: params});
    }

    login(username : string, password : string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/signin`, { username, password })
            .pipe(map(data => {
                if (data && data.token) {
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    this.currentUserSubject.next(data);
                }
                return data;
            }));
    }

    register(user : User) {
        return this.http.post<any>(`${environment.apiUrl}/auth/signup`, user);
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}