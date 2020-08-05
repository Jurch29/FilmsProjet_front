import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { Author } from 'src/app/shared/models/author';
import { Actor } from 'src/app/shared/models/actor';
import { Category } from 'src/app/shared/models/category';
import { first } from 'rxjs/operators';
import { AdministrationService } from 'src/app/core/service/administration.service';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-addmovieadm',
  templateUrl: './addmovieadm.component.html',
  styleUrls: ['./addmovieadm.component.css']
})
export class AddmovieadmComponent implements OnInit {

  public authors: Author[];
  public actors: Actor[];
  public categories: Category[];

  actorsControl = new FormControl();
  authorsControl = new FormControl();
  categoreiesControl = new FormControl();

  title = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  image = new FormControl('', Validators.required);
  date = new FormControl('', [Validators.required]);
  duration = new FormControl('', Validators.required);
  trailer = new FormControl('', Validators.required);
  synopsis = new FormControl('', Validators.required);

  error: any;
  loading: any = false;
  submitted = false;

  groupControl = new FormGroup({
    title: this.title,
    price: this.price,
    image: this.image,
    date: this.date,
    duration: this.duration,
    trailer: this.trailer,
    synopsis: this.synopsis
  });

  constructor(private movieService: MovieService,public dialogRef: MatDialogRef<AddmovieadmComponent>,
              private administrationService: AdministrationService) { }

  ngOnInit() {
    this.movieService.getAllActors().pipe(first())
    .subscribe(
      data => {
        this.actors = data;
      },
      error => {
        console.log(error);
      });

    this.movieService.getAllAuthors().pipe(first())
    .subscribe(
      data => {
        this.authors = data;
      },
      error => {
        console.log(error);
      });

    this.movieService.getAllCategorys().pipe(first())
    .subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log(error);
      });
  }

  addMovie(){
    this.submitted = true;
    if (this.groupControl.invalid) {
      this.submitted = false;
      return;
    }
    
    let movie : Movie = new Movie();
    movie.movieTitle = this.title.value;
    movie.moviePrice = this.price.value;
    movie.movieImagePath = this.image.value;
    movie.movieDate = this.date.value;
    movie.movieDuration = this.duration.value;
    movie.movieTrailerPath = this.trailer.value;
    movie.actors = this.actorsControl.value;
    movie.authors = this.authorsControl.value;
    movie.categories = this.categoreiesControl.value;

    this.administrationService.addMovie(movie,this.synopsis.value).pipe(first())
    .subscribe(
      data => {
        console.log(data);
        this.dialogRef.close("OK");
      },
      error => {
        console.log(error);
      });
  }

}
