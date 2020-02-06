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
import { Trailer } from 'src/app/shared/models/trailer';
import { MovieTrailer } from 'src/app/shared/models/movie-trailer';
import { Synopsis } from 'src/app/shared/models/synopsis';
import { OrderHistory } from 'src/app/shared/models/order-history';
import { Order } from 'src/app/shared/models/order';
import { OrderItem } from 'src/app/shared/models/order-item';

/*
 * MARIADB
 */

const users: User[] = [
    { id: 1, email: "j@j", username: 'ju', password: 'j', firstname: 'Admin', lastname: 'User', role: [Role.Admin] },
    { id: 2, email: "jacqou@jacot.fr", username: 'peter', password: 'a', firstname: 'Normal', lastname: 'User', role: [Role.User] },
    { id: 3, email: "a@a", username: 'anthal', password: 'a', firstname: 'Normal', lastname: 'User', role: [Role.User] }
];

let activations: UserActivation[] = [
    { user_id: 1, user_activation_code: 'ee' },
    { user_id: 3, user_activation_code: 'jeveuxpasser' }
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
    }, {
        movie_id: 3,
        movie_title: "Elysium",
        movie_price: 5,
        movie_image_path: "https://4.bp.blogspot.com/-V-rf6RaIruI/WJwwBeC5ssI/AAAAAAAAi-k/uMMSK5N8N9o022w5vIuMg2_C6jOsSAV0gCLcB/s1600/01.jpg",
        movie_file_path: "PicturesFolder/Preview/BDA_Elysium.jpg",
        movie_date: new Date("2013-08-14"),
        movie_duration: 110,
        movie_mark: 3.9,
        movie_is_deleted: false
    }
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
    },
    {
        moviecategory_movie_id: 3,
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
    }, {
        movieauthor_movie_id: 3,
        movieauthor_author_id: 3
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
    }, {
        movieactor_movie_id: 3,
        movieactor_actor_id: 9
    }
];

const authors: Author[] = [
    {
        author_id: 1,
        author_lastname: "Trou",
        author_firstname: "Brad"
    }, {
        author_id: 2,
        author_lastname: "La Belle",
        author_firstname: "Angelina"
    }, {
        author_id: 3,
        author_lastname: "Blomkamp",
        author_firstname: "Neill"
    }
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
        actor_lastname: "Pratt",
        actor_firstname: "Chris"
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
        actor_lastname: "Diesel",
        actor_firstname: "Vin"
    }, {
        actor_id: 9,
        actor_lastname: "Demon",
        actor_firstname: "Matt"
    }
];

let carts: CartItem[] = [
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

const trailers : Trailer[] = [
    {
        trailer_id : 1,
        trailer_path : "https://www.youtube.com/embed/0ZD711IkW1g"
    }, {
        trailer_id : 2,
        trailer_path : "https://www.youtube.com/embed/A1rWh7fyfPQ?rel=0&showinfo=0&controls=0&iv_load_policy=3&modestbranding=1"
    }, {
        trailer_id : 3,
        trailer_path : "https://www.youtube.com/embed/EXeTwQWrcwY?rel=0&showinfo=0&controls=0&iv_load_policy=3&modestbranding=1"
    }, {
        trailer_id : 4,
        trailer_path : "https://www.youtube.com/embed/oIBtePb-dGY?rel=0&showinfo=0&controls=0&iv_load_policy=3&modestbranding=1"
    }
];

const movieTrailer : MovieTrailer[] = [
    {
        movie_id : 1,
        trailer_id : 1
    }, {
        movie_id : 1,
        trailer_id : 2
    }, {
        movie_id : 2,
        trailer_id : 3
    }, {
        movie_id : 3,
        trailer_id : 4
    }
];

/*
 * **********
 */

 /*
 * MONGODB
 */

const synopsises : Synopsis[] = [
    {
        movie_id : 1,
        synopsis : "c'est le synopsis de deadpool là"
    }, {
        movie_id : 2,
        synopsis : "c'est le synopsis de dark knight là"
    }, {
        movie_id : 3,
        synopsis : "c'est le synopsis de elysium là"
    }
];

const orders : OrderHistory[] = [
    {
        user_id : 2,
        orders : [
            {
                purchase_date : new Date('2017/12/10 18:48:06'),
                items : [
                    {
                        movie_id : 3,
                        movie_price : 3.66,
                        count : 6
                    }, {
                        movie_id : 2,
                        movie_price : 3.03,
                        count : 1
                    }
                ]
            }
        ]
    }
];

/*
 * **********
 */

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
                case url.includes("/auth/activation") && method === 'GET':
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
                case url.match(/\/trailer\/\d+$/) && method === 'GET':
                    return getTrailersByMovieId();
                case url.match(/\/synopsis\/\d+$/) && method === 'GET':
                    return getSynopsisByMovieId();
                case url.match(/\/user\/cart\/\d+$/) && method === 'GET':
                    return getUserCart();
                case url.match(/\/user\/cart\/add/) && method === 'GET':
                    return addItemToCart();
                case url.match(/\/user\/cart\/buy\/\d+$/) && method === 'GET':
                    return buyCart();
                default:
                    return next.handle(request);
            }
        }

        // route functions

        function getCategorys() {
            return ok(categorys);
        }

        function getSynopsisByMovieId() {
            let synopsis = synopsises.find(x => x.movie_id === idFromUrl());
            return ok(synopsis);
        }

        function getTrailersByMovieId() {
            let movieTrailers = movieTrailer.filter(x => x.movie_id === idFromUrl());
            const trailerz = new Array<Trailer>();
            movieTrailers.forEach(element => {
                trailerz.push(trailers.find(x => x.trailer_id === element.trailer_id));
            });
            return ok(trailerz);
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

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Login ou mot de passe incorrect');

            const activation = activations.find(x => x.user_id === user.id);
            if (activation)
                return ok({ toActivate: true, id: user.id });

            return ok({
                id: user.id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
                email:user.email,
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
                username: false,
                email: false
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
            const user_id = request.params.get('user_id');
            const activation_code = request.params.get('activation_code');

            const activation = activations.find(x => x.user_id === parseInt(user_id) && x.user_activation_code === activation_code);
            if (activation) {
                activations = activations.filter(function (element) {
                    return element != activation;
                });
                return ok({ isActivated: true });
            }
            return ok({ isActivated: false });
        }

        function getUserCart() {
            let user_id = idFromUrl();
            let cart = carts.filter(function (element) {
                return element.user_id == user_id;
            });
            return ok(cart);
        }

        function addItemToCart() {
            const user_id = request.params.get('user_id');
            const movie_id = request.params.get('movie_id');
            if (!users.find(x => x.id === parseInt(user_id))) {
                return error("Utilisateur inconnu");
            }
            if (!movies.find(x => x.movie_id === parseInt(movie_id))) {
                return error("Film inconnu");
            }
            let cart = carts.find(x => x.user_id === parseInt(user_id) && x.movie_id === parseInt(movie_id));
            if (cart) {
                cart.movie_user_cart_count = cart.movie_user_cart_count + 1;
            } else {
                carts.push(
                    {
                        user_id : parseInt(user_id),
                        movie_id : parseInt(movie_id),
                        movie_user_cart_count : 1
                    }
                )
            }
            return ok({});
        }

        function buyCart() {
            const user_id = idFromUrl();
            let user = users.find(x => x.id === user_id);
            if (!user) {
                return error("Utilisateur introuvable");
            }
            const userCart = carts.filter(function (element) {
                return element.user_id == user_id;
            });
            if (!userCart) {
                return error("Panier vide");
            }
            let order : Order = new Order();
            order.purchase_date = new Date();
            order.items = new Array<OrderItem>();
            for (let cartItem of userCart) {
                let orderItem : OrderItem = new OrderItem();
                orderItem.movie_id = cartItem.movie_id;
                let movie = movies.find(x => x.movie_id === orderItem.movie_id);
                if (!movie) {
                    return error("Film introuvable");
                }
                orderItem.movie_price = movie.movie_price;
                orderItem.count = cartItem.movie_user_cart_count;
                order.items.push(orderItem);
            }
            carts = carts.filter(function (element) {
                return element.user_id != user_id;
            });
            return ok({});
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