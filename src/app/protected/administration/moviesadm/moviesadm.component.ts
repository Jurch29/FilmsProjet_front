import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie-service.service';
import { Movie } from 'src/app/shared/models/movie';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator, MatTableDataSource } from '@angular/material';

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

  movies : Movie[];
  dataSource;
  columnsToDisplay = ['ids', 'movies'];
  expandedElement: MovieElement | null;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getAllMovies().then(data=>{
      this.movies = data;
      this.dataSource = new MatTableDataSource(this.movies);
      this.dataSource.paginator = this.paginator;
    });
  }

  addmovie(){
    console.log("TODO");
  }

}

export interface MovieElement {
  id: number;
  movie: string;
}