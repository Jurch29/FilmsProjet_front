import { Image } from './image';

export class Comment {
    movieUserCommentId : number;
    movieUserCommentDate : Date;
    movieUserCommentIsDeleted : boolean;
    images : Image[];
}
