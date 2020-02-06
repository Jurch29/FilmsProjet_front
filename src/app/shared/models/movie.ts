import { Trailer } from './trailer';
import { Image } from './image';
import { Author } from './author';
import { Actor } from './actor';
import { Category } from './category'

export class Movie {
        movieId :number;
        movieTitle : string;
        moviePrice : number;
        movieImagePath : string;
        movieTrailerPath : String;
        movieFilePath : string;
        movieDate : Date;
        movieDuration : number;
        movieMark : number;
        movieIsDeleted : boolean;
        trailers : Trailer[];
        images : Image[];
        authors : Author[];
        actors : Actor[];
        categories : Category[];
}