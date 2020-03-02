import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }

  updateUser(user : User) {
    let username = user.userLastname;
    let firstname = user.userFirstname;
    let login = user.userLogin;
    let email = user.userEmail;
    let userid = user.userId;
    return this.http.post<User>(`${environment.apiUrl}/administration/updateuser`, { userid, username, firstname, login, email });
  }

  deleteUser(userId : number) {
    return this.http.delete<User>(`${environment.apiUrl}/administration/deleteuser/${userId}`);
  }

  updatePassword(userid: string, password: string){
    return this.http.post<User>(`${environment.apiUrl}/administration/updatepassword`, { userid, password });
  }

  addUser(user: User){
    let username = user.userLastname;
    let firstname = user.userFirstname;
    let login = user.userLogin;
    let email = user.userEmail;
    let password = user.userPassword;
    return this.http.post<User>(`${environment.apiUrl}/administration/adduser`, { username, firstname, login, email, password });
  }

}