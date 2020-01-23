import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    isUserFirstConnection(user_id : number) {
        return this.http.get<any>(`${environment.apiUrl}/auth/isFirstConnection/${user_id}`);
    }

    validateUser(user_id : number, activation_code : string) {
        return this.http.get<any>(`${environment.apiUrl}/auth/activation/${user_id}&${activation_code}`);
    }

    login(username : string, password : string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/signin`, { username, password })
            .pipe(map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
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