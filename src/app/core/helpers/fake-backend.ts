import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { Role } from '../../shared/models/role';
import { User } from '../../shared/models/user';
import { UserActivation } from '../../shared/models/user-activation';
import { Movie } from 'src/app/shared/models/movie';
import { Actor } from 'src/app/shared/models/actor';
import { Author } from 'src/app/shared/models/author';
import { MovieActor } from 'src/app/shared/models/movie-actor';
import { MovieAuthor } from 'src/app/shared/models/movie-author';
import { Category } from 'src/app/shared/models/category';
import { MovieCategory } from 'src/app/shared/models/movie-category';
import { CartItem } from 'src/app/shared/models/cart-item';

const users: User[] = [
    { id: 1, email: "j@j", username: 'ju', password: 'j', firstname: 'Admin', lastname: 'User', role: [Role.Admin] },
    { id: 2, email: "jacqou@jacot.fr", username: 'peter', password: 'a', firstname: 'Normal', lastname: 'User', role: [Role.User] },
    { id: 3, email: "a@a", username: 'anthal', password: 'a', firstname: 'Normal', lastname: 'User', role: [Role.User] }
];

let activations: UserActivation[] = [
    { user_id: 1, user_activation_code: 'ee'},
    { user_id: 3, user_activation_code: 'jeveuxpasser'}
];

const movies: Movie[] = [
    {
        movie_id: 1,
        movie_title: "Deadpool",
        movie_price: 10,
        movie_image_path: "https://upload.wikimedia.org/wikipedia/en/2/23/Deadpool_%282016_poster%29.png",
        movie_file_path: "PicturesFolder/Preview/BDA_Deadpool.jpg",
        movie_date: new Date("10/02/2016"),
        movie_duration: 108,
        movie_mark: 4.1,
        movie_is_deleted: false
    }, {
        movie_id: 2,
        movie_title: "The Dark Knight",
        movie_price: 3,
        movie_image_path: "http://culturaddict.com/wp-content/uploads/2016/07/TDK1.jpg",
        movie_file_path: "PicturesFolder/Preview/BDA_BatmanTheDarkNight.jpg",
        movie_date: new Date("2008-08-13"),
        movie_duration: 153,
        movie_mark: 4.5,
        movie_is_deleted: false
    },
];
const movieCategory: MovieCategory[] = [
    {
        moviecategory_movie_id: 1,
        moviecategory_category_id: 1
    },
    {
        moviecategory_movie_id: 1,
        moviecategory_category_id: 2
    },
    {
        moviecategory_movie_id: 1,
        moviecategory_category_id: 3
    },
    {
        moviecategory_movie_id: 2,
        moviecategory_category_id: 1
    },
    {
        moviecategory_movie_id: 2,
        moviecategory_category_id: 2
    },
    {
        moviecategory_movie_id: 2,
        moviecategory_category_id: 3
    }
];
const categorys: Category[] = [
    {
        category_id: 1,
        category_title: "Super-heros"
    }, {
        category_id: 2,
        category_title: "Comedie"
    }, {
        category_id: 3,
        category_title: "Action"
    }
];
const movieAuthor: MovieAuthor[] = [
    {
        movieauthor_movie_id: 1,
        movieauthor_author_id: 1
    }, {
        movieauthor_movie_id: 2,
        movieauthor_author_id: 2
    }
];
const movieActor: MovieActor[] = [
    {
        movieactor_movie_id: 1,
        movieactor_actor_id: 1
    }, {
        movieactor_movie_id: 1,
        movieactor_actor_id: 2
    }, {
        movieactor_movie_id: 1,
        movieactor_actor_id: 3
    }, {
        movieactor_movie_id: 2,
        movieactor_actor_id: 4
    }, {
        movieactor_movie_id: 2,
        movieactor_actor_id: 5
    }, {
        movieactor_movie_id: 2,
        movieactor_actor_id: 6
    }, {
        movieactor_movie_id: 2,
        movieactor_actor_id: 7
    }, {
        movieactor_movie_id: 2,
        movieactor_actor_id: 8
    }
];
const authors: Author[] = [
    {
        author_id: 1,
        author_lastname: "Brad",
        author_firstname: "Trou"
    }, {
        author_id: 2,
        author_lastname: "Angelina",
        author_firstname: "La Belle"
    },
];

const actors: Actor[] = [
    {
        actor_id: 1,
        actor_lastname: "Reynolds",
        actor_firstname: "Ryan"
    }, {
        actor_id: 2,
        actor_lastname: "Baccarin",
        actor_firstname: "Morena"
    }, {
        actor_id: 3,
        actor_lastname: "T. J.",
        actor_firstname: "Miller"
    }, {
        actor_id: 4,
        actor_lastname: "Chris",
        actor_firstname: "Pratt"
    }, {
        actor_id: 5,
        actor_lastname: "Saldana",
        actor_firstname: "Zoe"
    }, {
        actor_id: 6,
        actor_lastname: "Bautista",
        actor_firstname: "David"
    }, {
        actor_id: 7,
        actor_lastname: "Gunn",
        actor_firstname: "James"
    }, {
        actor_id: 8,
        actor_lastname: "Vin",
        actor_firstname: "Diesel"
    }
];

const carts: CartItem[] = [
    {
        user_id: 2,
        movie_id: 1,
        movie_user_cart_count: 3
    }, {
        user_id: 2,
        movie_id: 2,
        movie_user_cart_count: 1
    }, {
        user_id: 3,
        movie_id: 1,
        movie_user_cart_count: 1
    }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/auth/signin') && method === 'POST':
                    return authenticate();
                case url.endsWith('/auth/signup') && method === 'POST':
                    return registerate();
                case url.match(/\/auth\/\activation\/\d+&[a-zA-Z0-9]+$/) && method === 'GET':
                    return activate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.endsWith('/movies') && method === 'GET':
                    return getMovies();
                case url.match(/\/movies\/\d+$/) && method === 'GET':
                    return getMovieById();
                case url.endsWith('/actors') && method === 'GET':
                    return getActors();
                case url.match(/\/actors\/\d+$/) && method === 'GET':
                    return getActorsByMovieId();
                case url.endsWith('/author') && method === 'GET':
                    return getAuthors();
                case url.match(/\/author\/\d+$/) && method === 'GET':
                    return getAuthorsByMovieId();
                case url.endsWith('/category') && method === 'GET':
                    return getCategorys();
                case url.match(/\/category\/\d+$/) && method === 'GET':
                    return getCategorysByMovieId();
                case url.match(/\/user\/cart\/\d+$/) && method === 'GET':
                        return getUserCart();
                default:
                    return next.handle(request);
            }
        }
        
        function getCategorys() {
            return ok(categorys);
        }

        function getCategorysByMovieId() {
            let moviecategorys = movieCategory.filter(x => x.moviecategory_movie_id === idFromUrl());
            const categoryz = new Array<Category>();
            moviecategorys.forEach(element => {
                categoryz.push(categorys.find(x => x.category_id === element.moviecategory_category_id));
            });
            return ok(categoryz);
        }
        function getAuthors() {
            return ok(authors);
        }

        function getAuthorsByMovieId() {
            let movieauthors = movieAuthor.filter(x => x.movieauthor_movie_id === idFromUrl());
            const authorz = new Array<Author>();
            movieauthors.forEach(element => {
                authorz.push(authors.find(x => x.author_id === element.movieauthor_author_id));
            });
            return ok(authorz);
        }

        function getActors() {
            return ok(actors);
        }

        function getActorsByMovieId() {
            const movieactors = movieActor.filter(x => x.movieactor_movie_id === idFromUrl());
            let actorz = new Array<Actor>();
            movieactors.forEach(element => {
                actorz.push(actors.find(x => x.actor_id === element.movieactor_actor_id));
            });
            return ok(actorz);
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Login ou mot de passe incorrect');

            const activation = activations.find(x => x.user_id === user.id);
            if (activation)
                return ok({ isActivation : true, id: user.id });

            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstname,
                lastName: user.lastname,
                role: user.role,
                token: `fake-jwt-token.${user.id}`
            });
        }

        function registerate() {
            let newUser = new User();
            newUser.username = body.username;
            newUser.lastname = body.lastname;
            newUser.firstname = body.firstname;
            newUser.password = body.password;
            newUser.email = body.email;
            newUser.role = body.role;
            let maxId = 0;
            let found = {
                username : false,
                email : false
            };
            for (let user of users) {
                if (maxId < user.id) {
                    maxId = user.id;
                }
                if (user.username == newUser.username) {
                    found.username = true;
                }
                if (user.email == newUser.email) {
                    found.email = true;
                }
            }
            if (!found.username && !found.email) {
                newUser.id = maxId + 1;
                users.push(newUser);
                let activation = new UserActivation();
                activation.user_id = newUser.id;
                activation.user_activation_code = 'CodeX1';
                activations.push(activation);
                return ok(found);
            }
            return error(found);
        }

        function getUsers() {
            if (!isAdmin()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            // only admins can access other user records
            if (!isAdmin() && currentUser().id !== idFromUrl()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }
        function getMovies() {
            return ok(movies);
        }

        function getMovieById() {
            const movie = movies.find(x => x.movie_id === idFromUrl());
            return ok(movie);
        }

        function activate() {
            const params = multipleParametersFromUrl();
            const activation = activations.find(x => x.user_id === parseInt(params[0]) && x.user_activation_code === params[1]);
            if (activation) {
                activations = activations.filter(function(element) {
                    return element != activation;
                });
                return ok({ isActivated : true });
            }
            return ok({ isActivated : false });
        }

        function getUserCart() {
            let user_id = idFromUrl();
            let cart = carts.filter(function(element) {
                return element.user_id == user_id;
            });
            return ok(cart);
        }

        // helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'unauthorized' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function isAdmin() {
            return isLoggedIn() && currentUser().role === [Role.Admin];
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization').split('.')[1]);
            return users.find(x => x.id === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function multipleParametersFromUrl() {
            return url.split('/')[url.split('/').length - 1].split('&');
        }
    }
}

export const fakeBackendProvider = {
    // Utilisation d'un fake backend pour la phase de DEV
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};