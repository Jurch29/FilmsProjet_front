import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-usersadm',
  templateUrl: './usersadm.component.html',
  styleUrls: ['./usersadm.component.css']
})
export class UsersadmComponent implements OnInit {

  users : User[];

  constructor() { }

  ngOnInit() {
  }

}
