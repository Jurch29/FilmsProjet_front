import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { AdministrationService } from 'src/app/core/service/administration.service';
import { Author } from 'src/app/shared/models/author';
import { Actor } from 'src/app/shared/models/actor';
import { Category } from 'src/app/shared/models/category';
import { first } from 'rxjs/operators'
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { AdddatamovieadmComponent } from '../adddatamovieadm/adddatamovieadm.component';

@Component({
  selector: 'app-datamovieadm',
  templateUrl: './datamovieadm.component.html',
  styleUrls: ['./datamovieadm.component.css']
})
export class DatamovieadmComponent implements OnInit {

  @ViewChild('actorPaginator', {static: true}) actorPaginator: MatPaginator;
  @ViewChild('authorPaginator', {static: true}) authorPaginator: MatPaginator;
  @ViewChild('categoryPaginator', {static: true}) categoryPaginator: MatPaginator;

  public authors: Author[];
  public actors: Actor[];
  public categories: Category[];

  public actorid : any = {};
  public authorid : any = {};
  public categoryid : any = {};

  public dataSourceActors;
  displayedActorColumns = ['idactor', 'nameactor', 'firstnameactor', 'deleteactor'];

  public dataSourceAuthors;
  displayedAuthorColumns = ['idauthor', 'nameauthor', 'firstnameauthor', 'deleteauthor'];

  public dataSourceCategories;
  displayedCategoryColumns = ['idcategory', 'namecategory', 'deletecategory'];

  constructor(private movieService: MovieService, private administrationService: AdministrationService,public dialog: MatDialog) { }

  ngOnInit() {
    this.movieService.getAllActors().pipe(first())
    .subscribe(
      data => {
        this.actors = data;
        this.actorid = this.actors.map(({ actor_id }) => actor_id);
        this.dataSourceActors = new MatTableDataSource(this.actors);
        this.dataSourceActors.paginator = this.actorPaginator;
      },
      error => {
        console.log(error);
      });

    this.movieService.getAllAuthors().pipe(first())
    .subscribe(
      data => {
        this.authors = data;
        this.authorid = this.authors.map(({ author_id }) => author_id);
        this.dataSourceAuthors = new MatTableDataSource(this.authors);
        this.dataSourceAuthors.paginator = this.authorPaginator;
      },
      error => {
        console.log(error);
      });

    this.movieService.getAllCategorys().pipe(first())
    .subscribe(
      data => {
        this.categories = data;
        this.categoryid = this.categories.map(({ category_id }) => category_id);
        this.dataSourceCategories = new MatTableDataSource(this.categories);
        this.dataSourceCategories.paginator = this.categoryPaginator;
      },
      error => {
        console.log(error);
      });
  }


  addActor(){
    let dialogRef;
    dialogRef = this.dialog.open(AdddatamovieadmComponent, {
        data: {display: 'actor'}
    });
    dialogRef.afterClosed().subscribe(result => {
      //pareil
      if (result==="ok")
        window.location.reload();
    });
  }

  addAuthor(){
    let dialogRef;
    dialogRef = this.dialog.open(AdddatamovieadmComponent, {
        data: {display: 'author'}
    });
    dialogRef.afterClosed().subscribe(result => {
      //pareil
      if (result==="ok")
        window.location.reload();
    });
  }

  addCategory(){
    let dialogRef;
    dialogRef = this.dialog.open(AdddatamovieadmComponent, {
        data: {display: 'category'}
    });
    dialogRef.afterClosed().subscribe(result => {
      //pareil
      if (result==="ok")
        window.location.reload();
    });
  }


  deleteActor(line){
    let id = this.actorid[line];
    console.log("truc");
    this.administrationService.deleteActor(id).pipe(first())
    .subscribe(
      data => {
        window.location.reload();
      },
      error => {
        console.log(error);
      });
  }

  deleteAuthor(line){
    let id = this.authorid[line];
    this.administrationService.deleteAuthor(id).pipe(first())
    .subscribe(
      data => {
        window.location.reload();
      },
      error => {
        console.log(error);
      });
  }

  deleteCategory(line){
    let id = this.categoryid[line];
    this.administrationService.deleteCategory(id).pipe(first())
    .subscribe(
      data => {
        window.location.reload();
      },
      error => {
        console.log(error);
      });
  }


  applyActorFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceActors.filter = filterValue.trim().toLowerCase();
  }

  applyAuthorFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAuthors.filter = filterValue.trim().toLowerCase();
  }

  applyCatgoryFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCategories.filter = filterValue.trim().toLowerCase();
  }

}
