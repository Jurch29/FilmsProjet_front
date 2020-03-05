import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { Movie } from 'src/app/shared/models/movie';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { AdministrationService } from 'src/app/core/service/administration.service';
import { first } from 'rxjs/operators';
import { AddmovieadmComponent } from '../addmovieadm/addmovieadm.component';

@Component({
  selector: 'app-moviesadm',
  templateUrl: './moviesadm.component.html',
  styleUrls: ['./moviesadm.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MoviesadmComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public movieid : any = {};
  public title : any = {};
  public price : any = {};
  public date : any = {};
  public image : any = {};
  public trailer : any = {};
  public duration : any = {};

  public mydate = new Date();

  movies : Movie[];
  private dataSource;
  private pageIndex = 5;
  columnsToDisplay = ['ids', 'movies'];
  expandedElement: MovieElement | null;

  constructor(private movieService: MovieService, public datepipe: DatePipe, private AdministrationService: AdministrationService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.movieService.getAllMovies().then(data=>{
      this.movies = data;

      this.movieid = this.movies.map(({ movieId }) => movieId);
      this.title = this.movies.map(({ movieTitle }) => movieTitle);
      this.price = this.movies.map(({ moviePrice }) => moviePrice);
      this.date = this.movies.map(({ movieDate }) =>this.formatDate( new Date(movieDate)));
      this.image = this.movies.map(({ movieImagePath }) => movieImagePath);
      this.trailer = this.movies.map(({ movieTrailerPath }) => movieTrailerPath);
      this.duration = this.movies.map(({ movieDuration }) => movieDuration);
      
      this.dataSource = new MatTableDataSource(this.movies);
      this.dataSource.paginator = this.paginator;
    });
  }

  addmovie(){
    let dialogRef;
    dialogRef = this.dialog.open(AddmovieadmComponent, {
        width: '380px'
    });
    dialogRef.afterClosed().subscribe(result => {
      //pareil
      if (result==="ok")
        window.location.reload();
    });
  }

  saveMovie(line){
    let updatedMovie: Movie = new Movie();

    updatedMovie.movieTitle = this.title[line];
    updatedMovie.moviePrice = this.price[line];
    updatedMovie.movieDate = this.formatDate(this.date[line]);
    updatedMovie.movieImagePath = this.image[line];
    updatedMovie.movieTrailerPath = this.trailer[line];
    updatedMovie.movieDuration = this.duration[line];

    this.AdministrationService.updateMovie(updatedMovie).pipe(first()).subscribe(
      data => {
        //même problème ? [pas testé]
        window.location.reload();
      },
      error => {
        console.log(error);
      }
  )
  }

  formatDate(srtdate: Date) {
    var re = /0000/gi; 
    if(srtdate != null){
      let date = new Date(srtdate.toString().replace(re, "00:00"));
      let formattedDate =new Date(this.datepipe.transform(date, 'dd-MM-yyyy'));
     return formattedDate;
    }
    return null;
  }

  deleteMovie(line){
    let id = this.movieid[line]
    this.AdministrationService.deleteMovie(id).pipe(first()).subscribe(
      data => {
        //Cela supprime bien la bonne ligne dans l'array mais visuellement c'est la dernière line qui saute
        // const index = this.dataSource.data.indexOf(line);
        // this.dataSource.data.splice(index, 1);
        // this.dataSource._updateChangeSubscription();
        //Par défaut on fait un reolad de la page si pas de solution
        console.log(data);
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

export interface MovieElement {
  id: number;
  movie: string;
}