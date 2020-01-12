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

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/signin`, { username, password })
            .pipe(map(user => {
                //console.log("User : " + JSON.stringify(user));
                // login successful si il y a un JWT dans la réponse
                if (user && user.accessToken) {
                    // Enregistre les détail user + jwt dans le local storage
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    register(user: User) {
        console.log(user);

        return this.http.post<any>(`${environment.apiUrl}/auth/signup`, user).pipe(map(response=> {
            console.log(response);
        }));
    }

    logout() {
        // Supprime l'utilisateur du local storage pour loggout
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}