import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { Movie } from 'src/app/shared/models/movie';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';

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

  constructor(private movieService: MovieService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.movieService.getAllMovies().then(data=>{
      this.movies = data;

      this.title = this.movies.map(({ movieTitle }) => movieTitle);
      this.price = this.movies.map(({ moviePrice }) => moviePrice);
      this.date = this.movies.map(({ movieDate }) => new Date(movieDate));
      this.image = this.movies.map(({ movieImagePath }) => movieImagePath);
      this.trailer = this.movies.map(({ movieTrailerPath }) => movieTrailerPath);
      this.duration = this.movies.map(({ movieDuration }) => movieDuration);
      
      this.dataSource = new MatTableDataSource(this.movies);
      this.dataSource.paginator = this.paginator;
    });
  }

  addmovie(){
    console.log("TODO");
  }

  saveMovie(i){
    console.log(i);
  }

  deleteMovie(i){
    console.log(i);
  }

  onPaginateChange(event){
    console.log(event.pageIndex);
    //alert(JSON.stringify("Current page index: " + event.pageIndex));
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