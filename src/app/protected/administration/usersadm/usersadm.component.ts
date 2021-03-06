import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/core/service/user.service';
import { first } from 'rxjs/operators';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { AdministrationService } from 'src/app/core/service/administration.service';
import { ChangepasswordadmComponent } from '../changepasswordadm/changepasswordadm.component';
import { AdduseradmComponent } from '../adduseradm/adduseradm.component';
import { LightmodeService } from 'src/app/core/service/lightmode.service';

export interface UserElement {
  userFirstname: string;
  userLastname: string;
  userLogin: string;
  userEmail: string;
  userLastConnection: Date;
}

@Component({
  selector: 'app-usersadm',
  templateUrl: './usersadm.component.html',
  styleUrls: ['./usersadm.component.css']
})

export class UsersadmComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public firstname : any = {};
  public lastname : any = {};
  public login : any = {};
  public email : any = {};
  public usersid : any = {};

  displayedColumns: string[] = 
  ['ids', 'userFirstname', 'userLastname', 'userLogin', 'userEmail','userLastConnection', 'password', 'delete', 'save'];
  dataSource;

  users : User[];
  constructor(private userservice: UserService, public datepipe: DatePipe, public dialog: MatDialog,
   private authenticationService: AuthenticationService, private AdministrationService: AdministrationService) {}

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Objet par page';
    this.userservice.getAllUser()
    .pipe(first())
    .subscribe(
      data => {
        this.users = data;
        
        //Le current admin ne doit pas pouvoir changer ses infos ici
        let userId = this.authenticationService.currentUserValue.userId;
        this.users = this.users.filter(function( obj ) {
          return obj.userId !== userId;
        });

        this.usersid = this.users.map(({ userId }) => userId);
        this.firstname = this.users.map(({ userFirstname }) => userFirstname);
        this.lastname = this.users.map(({ userLastname }) => userLastname);
        this.login = this.users.map(({ userLogin }) => userLogin);
        this.email = this.users.map(({ userEmail }) => userEmail);

        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error);
      });
  }

  
  formatDate(srtdate: string) {
    var re = /0000/gi; 
    if(srtdate !=null){
      let date = new Date(srtdate.replace(re, "00:00"));
      let formattedDate =this.datepipe.transform(date, 'dd-MM-yyyy');
      return formattedDate;
    }
    return null;
  }


  delete(line){
    let id = this.usersid[line];
    this.AdministrationService.deleteUser(id).pipe(first()).subscribe(
      data => {
        //Cela supprime bien la bonne ligne dans l'array mais visuellement c'est la dernière line qui saute
        // const index = this.dataSource.data.indexOf(line);
        // this.dataSource.data.splice(index, 1);
        // this.dataSource._updateChangeSubscription();
        //Par défaut on fait un reolad de la page si pas de solution
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    )
  }

  validate(line){
    let updatedUser : User = new User();

    updatedUser.userId = this.usersid[line];
    updatedUser.userFirstname = this.firstname[line];
    updatedUser.userLastname = this.lastname[line];
    updatedUser.userLogin = this.login[line];
    updatedUser.userEmail = this.email[line];
    
    this.AdministrationService.updateUser(updatedUser).pipe(first()).subscribe(
        data => {
          //même problème ? [pas testé]
          window.location.reload();
        },
        error => {
          console.log(error);
        }
    )
  }

  adduser(){
    let dialogRef;
    dialogRef = this.dialog.open(AdduseradmComponent, {
        width: '380px'
    });
    dialogRef.afterClosed().subscribe(result => {
      //pareil
      if (result==="ok")
        window.location.reload();
    });
  }

  passwordChange(line){
    let dialogRef;
    dialogRef = this.dialog.open(ChangepasswordadmComponent, {
        width: '380px',
        data: {id: this.usersid[line]}
    });
  }

  // applyFilter(event: Event) {
  //   //Problème ici aussi lié surement au problème précèdent
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

}