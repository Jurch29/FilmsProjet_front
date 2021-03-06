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
import { Image } from 'src/app/shared/models/image';
import { EmbeddedKeyMovieUser } from 'src/app/shared/models/embeddedKeyMovieUser';

/*
 * MARIADB
 */

const users: User[] = [
    { userId: 1, userEmail: "j@j", userLogin: 'ju', userPassword: 'j', userFirstname: 'Admin', userLastname: 'User', roles: [Role.Admin], userIsDeleted: false, userLastConnection: "18/11/1992" },
    { userId: 2, userEmail: "jacqou@jacot.fr", userLogin: 'peter', userPassword: 'a', userFirstname: 'Normal', userLastname: 'User', roles: [Role.User], userIsDeleted: false, userLastConnection: "18/11/1992" },
    { userId: 3, userEmail: "a@a", userLogin: 'anthal', userPassword: 'a', userFirstname: 'Normal', userLastname: 'User', roles: [Role.User], userIsDeleted: false, userLastConnection: "18/11/1992" }
];

let activations: UserActivation[] = [
    { user_id: 1, user_activation_code: 'ee' },
    { user_id: 3, user_activation_code: 'jeveuxpasser' }
];

const images: Image[] = [
    { image_id: 1, imagePath: "imageofthepath" },
    { image_id: 2, imagePath: "imageofthepath" },
    { image_id: 3, imagePath: "imageofthepath" },
    { image_id: 4, imagePath: "imageofthepath" },
    { image_id: 5, imagePath: "imageofthepath" }
]

const authors: Author[] = [
    {
        author_id: 1,
        authorLastName: "Miller",
        authorFirstName: "Tim"
    }, {
        author_id: 2,
        authorLastName: "Nolan",
        authorFirstName: "Christopher"
    }, {
        author_id: 3,
        authorLastName: "Blomkamp",
        authorFirstName: "Neill"
    }
];

const actors: Actor[] = [
    {
        actor_id: 1,
        actorLastName: "Reynolds",
        actorFirstName: "Ryan"
    }, {
        actor_id: 2,
        actorLastName: "Baccarin",
        actorFirstName: "Morena"
    }, {
        actor_id: 3,
        actorLastName: "T. J.",
        actorFirstName: "Miller"
    }, {
        actor_id: 4,
        actorLastName: "Bale",
        actorFirstName: "Christian"
    }, {
        actor_id: 5,
        actorLastName: "Ledger",
        actorFirstName: "Health"
    }, {
        actor_id: 6,
        actorLastName: "Caine",
        actorFirstName: "Michael"
    }, {
        actor_id: 7,
        actorLastName: "Oldman",
        actorFirstName: "Gary"
    }, {
        actor_id: 8,
        actorLastName: "Freeman",
        actorFirstName: "Morgan"
    }, {
        actor_id: 9,
        actorLastName: "Demon",
        actorFirstName: "Matt"
    }, {
        actor_id: 10,
        actorLastName: "Foster",
        actorFirstName: "Jodie"
    }, {
        actor_id: 11,
        actorLastName: "Copley",
        actorFirstName: "Sharlito"
    }, {
        actor_id: 12,
        actorLastName: "Braga",
        actorFirstName: "Alice"
    }
];

const categorys: Category[] = [
    {
        category_id: 1,
        categoryTitle: "Super-heros"
    }, {
        category_id: 2,
        categoryTitle: "Comedie"
    }, {
        category_id: 3,
        categoryTitle: "Action"
    }, {
        category_id: 4,
        categoryTitle: "Fantasie"
    }, {
        category_id: 5,
        categoryTitle: "Science-Fiction"
    }, {
        category_id: 6,
        categoryTitle: "Drame"
    }, {
        category_id: 7,
        categoryTitle: "Thriller"
    }
];

const trailers: Trailer[] = [
    {
        trailer_id: 1,
        trailerPath: "https://www.youtube.com/embed/A1rWh7fyfPQ?rel=0&showinfo=0&controls=0&iv_load_policy=3&modestbranding=1"
    }
];

const movies: Movie[] = [
    {
        movieId: 1,
        movieTitle: "Deadpool",
        moviePrice: 10,
        movieImagePath: "https://upload.wikimedia.org/wikipedia/en/2/23/Deadpool_%282016_poster%29.png",
        movieTrailerPath: "https://www.youtube.com/embed/0ZD711IkW1g?rel=0&showinfo=0&controls=0&iv_load_policy=3&modestbranding=1",
        movieFilePath: "PicturesFolder/Preview/BDA_Deadpool.jpg",
        movieDate: new Date("10/02/2016"),
        movieDuration: 108,
        movieMark: 4.1,
        movieIsDeleted: false,
        actors: [
            {
                actor_id: 1,
                actorLastName: "Reynolds",
                actorFirstName: "Ryan"
            }, {
                actor_id: 2,
                actorLastName: "Baccarin",
                actorFirstName: "Morena"
            }, {
                actor_id: 3,
                actorLastName: "T. J.",
                actorFirstName: "Miller"
            }
        ],
        authors: [
            {
                author_id: 1,
                authorLastName: "Miller",
                authorFirstName: "Tim"
            }
        ],
        categories: [
            {
                category_id: 4,
                categoryTitle: "Fantasy"
            }, {
                category_id: 5,
                categoryTitle: "Science-Fiction"
            }
        ],
        images: [],
        trailers: []
    }, {
        movieId: 2,
        movieTitle: "Batman : The Dark Night",
        moviePrice: 6.3,
        movieImagePath: "http://culturaddict.com/wp-content/uploads/2016/07/TDK1.jpg",
        movieTrailerPath: "https://www.youtube.com/embed/EXeTwQWrcwY?rel=0&showinfo=0&controls=0&iv_load_policy=3&modestbranding=1",
        movieFilePath: "PicturesFolder/Preview/BDA_TheDarkNight.jpg",
        movieDate: new Date("08/13/2008"),
        movieDuration: 153,
        movieMark: 5,
        movieIsDeleted: false,
        actors: [
            {
                actor_id: 4,
                actorLastName: "Bale",
                actorFirstName: "Christian"
            }, {
                actor_id: 5,
                actorLastName: "Ledger",
                actorFirstName: "Health"
            }, {
                actor_id: 6,
                actorLastName: "Caine",
                actorFirstName: "Michael"
            }, {
                actor_id: 7,
                actorLastName: "Oldman",
                actorFirstName: "Gary"
            }, {
                actor_id: 8,
                actorLastName: "Freeman",
                actorFirstName: "Morgan"
            }
        ],
        authors: [
            {
                author_id: 2,
                authorLastName: "Nolan",
                authorFirstName: "Christopher"
            }
        ],
        categories: [
            {
                category_id: 6,
                categoryTitle: "Drame"
            }, {
                category_id: 7,
                categoryTitle: "Thriller"
            }
        ],
        images: [],
        trailers: []
    }, {
        movieId: 3,
        movieTitle: "Elysium",
        moviePrice: 5.36,
        movieImagePath: "https://4.bp.blogspot.com/-V-rf6RaIruI/WJwwBeC5ssI/AAAAAAAAi-k/uMMSK5N8N9o022w5vIuMg2_C6jOsSAV0gCLcB/s1600/01.jpg",
        movieTrailerPath: "https://www.youtube.com/embed/oIBtePb-dGY?rel=0&showinfo=0&controls=0&iv_load_policy=3&modestbranding=1",
        movieFilePath: "PicturesFolder/Preview/BDA_Elysium.jpg",
        movieDate: new Date("08/14/2013"),
        movieDuration: 109,
        movieMark: 3.4,
        movieIsDeleted: false,
        actors: [
            {
                actor_id: 9,
                actorLastName: "Demon",
                actorFirstName: "Matt"
            }, {
                actor_id: 10,
                actorLastName: "Foster",
                actorFirstName: "Jodie"
            }, {
                actor_id: 11,
                actorLastName: "Copley",
                actorFirstName: "Sharlito"
            }, {
                actor_id: 12,
                actorLastName: "Braga",
                actorFirstName: "Alice"
            }
        ],
        authors: [
            {
                author_id: 3,
                authorLastName: "Blomkamp",
                authorFirstName: "Neill"
            }
        ],
        categories: [
            {
                category_id: 5,
                categoryTitle: "Science-Fiction"
            }, {
                category_id: 6,
                categoryTitle: "Drame"
            }
        ],
        images: [],
        trailers: []
    }
];

const movieCategory: MovieCategory[] = [
    {
        movie_id: 1,
        category_id: 1
    },
    {
        movie_id: 1,
        category_id: 2
    },
    {
        movie_id: 1,
        category_id: 3
    },
    {
        movie_id: 2,
        category_id: 1
    },
    {
        movie_id: 2,
        category_id: 2
    },
    {
        movie_id: 2,
        category_id: 3
    },
    {
        movie_id: 3,
        category_id: 3
    }
];

const movieAuthor: MovieAuthor[] = [
    {
        movie_id: 1,
        author_id: 1
    }, {
        movie_id: 2,
        author_id: 2
    }, {
        movie_id: 3,
        author_id: 3
    }
];

const movieActor: MovieActor[] = [
    {
        movie_id: 1,
        actor_id: 1
    }, {
        movie_id: 1,
        actor_id: 2
    }, {
        movie_id: 1,
        actor_id: 3
    }, {
        movie_id: 2,
        actor_id: 4
    }, {
        movie_id: 2,
        actor_id: 5
    }, {
        movie_id: 2,
        actor_id: 6
    }, {
        movie_id: 2,
        actor_id: 7
    }, {
        movie_id: 2,
        actor_id: 8
    }, {
        movie_id: 3,
        actor_id: 9
    }
];

let embeddedKeyMovieUser: EmbeddedKeyMovieUser[] = [
    {
        movieId: 1,
        userId: 3
    }, {
        movieId: 3,
        userId: 2
    }
]

let carts: CartItem[] = [
    {
        embeddedKeyMovieUser: embeddedKeyMovieUser[0],
        movieUserCartCount: 2
    }, {
        embeddedKeyMovieUser: embeddedKeyMovieUser[1],
        movieUserCartCount: 2
    }
];

const movieTrailer: MovieTrailer[] = [
    {
        movie_id: 1,
        trailer_id: 1
    }, {
        movie_id: 1,
        trailer_id: 2
    }, {
        movie_id: 2,
        trailer_id: 3
    }, {
        movie_id: 3,
        trailer_id: 4
    }
];

/*
 * **********
 */

/*
* MONGODB
*/

const synopsises: Synopsis[] = [
    {
        movieId: 1,
        movieDescription: "c'est le synopsis de deadpool là"
    }, {
        movieId: 2,
        movieDescription: "c'est le synopsis de dark knight là"
    }, {
        movieId: 3,
        movieDescription: "c'est le synopsis de elysium là"
    }
];

const orders: OrderHistory[] = [
    {
        userId: 2,
        orders: [
            {
                purchase_date: '2017/12/10 18:48:06',
                items: [
                    {
                        movie_id: 3,
                        movie_price: 3.66,
                        count: 6
                    }, {
                        movie_id: 2,
                        movie_price: 3.03,
                        count: 1
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
                case url.endsWith('/changeuserdetails') && method === 'POST':
                    return changeUserInfo();
                case url.endsWith('/changepassword') && method === 'POST':
                    return changePassword();
                case url.includes("/credentialsrecovery") && method === 'POST':
                        return forgetPasswordEmailOnly();
                case url.includes("/forgetPassword") && method === 'POST':
                    return forgetPassword();
                case url.includes("/checkuserpassword") && method === 'GET':
                    return checkUserPassword();
                case url.includes("/auth/activation") && method === 'GET':
                    return activate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.endsWith('/movie/movies') && method === 'GET':
                    return getMovies();
                case url.match(/\/movie\/movie\/\d+$/) && method === 'GET':
                    return getMovieById();
                case url.endsWith('/movie/actors') && method === 'GET':
                    return getActors();
                case url.match(/\/actors\/\d+$/) && method === 'GET':
                    return getActorsByMovieId();
                case url.endsWith('/movie/authors') && method === 'GET':
                    return getAuthors();
                case url.match(/\/author\/\d+$/) && method === 'GET':
                    return getAuthorsByMovieId();
                case url.endsWith('/movie/categories') && method === 'GET':
                    return getCategorys();
                case url.match(/\/category\/\d+$/) && method === 'GET':
                    return getCategorysByMovieId();
                case url.match(/\/trailer\/\d+$/) && method === 'GET':
                    return getTrailersByMovieId();
                case url.match(/\/synopsis\/\d+$/) && method === 'GET':
                    return getSynopsisByMovieId();
                case url.match(/\/user\/cart\/\d+$/) && method === 'GET':
                    return getUserCart();
                case url.match(/\/user\/additemtocart/) && method === 'POST':
                    return addItemToCart();
                case url.match(/\/user\/removeitemtocart/) && method === 'POST':
                    return removeItemToCart();
                case url.match(/\/user\/clearcart/) && method === 'POST':
                    return clearCart();
                case url.match(/\/user\/cartmerge/) && method === 'POST':
                    return mergeItemsToCart();
                case url.match(/\/user\/buycart/) && method === 'POST':
                    return buyCart();
                case url.match(/\/user\/orders\/\d+$/) && method === 'GET':
                    return getOrdersByUserId();
                default:
                    return next.handle(request);
            }
        }

        // route functions

        function getCategorys() {
            return ok(categorys);
        }

        function getSynopsisByMovieId() {
            let synopsis = synopsises.find(x => x.movieId === idFromUrl());
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
            let moviecategorys = movieCategory.filter(x => x.movie_id === idFromUrl());
            const categoryz = new Array<Category>();
            moviecategorys.forEach(element => {
                categoryz.push(categorys.find(x => x.category_id === element.category_id));
            });
            return ok(categoryz);
        }

        function getAuthors() {
            return ok(authors);
        }

        function getAuthorsByMovieId() {
            let movieauthors = movieAuthor.filter(x => x.movie_id === idFromUrl());
            const authorz = new Array<Author>();
            movieauthors.forEach(element => {
                authorz.push(authors.find(x => x.author_id === element.author_id));
            });
            return ok(authorz);
        }

        function getActors() {
            return ok(actors);
        }

        function getActorsByMovieId() {
            const movieactors = movieActor.filter(x => x.movie_id === idFromUrl());
            let actorz = new Array<Actor>();
            movieactors.forEach(element => {
                actorz.push(actors.find(x => x.actor_id === element.actor_id));
            });
            return ok(actorz);
        }

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.userLogin === username && x.userPassword === password);
            if (!user) return error('Login ou mot de passe incorrect');

            const activation = activations.find(x => x.user_id === user.userId);
            if (activation)
                return ok({ toActivate: true, userId: user.userId });

            return ok({
                userId: user.userId,
                userLogin: user.userLogin,
                userFirstname: user.userFirstname,
                userLastname: user.userLastname,
                roles: user.roles,
                userEmail: user.userEmail,
                token: `fake-jwt-token.${user.userId}`
            });
        }

        function registerate() {
            let newUser = new User();
            newUser.userLogin = body.userLogin;
            newUser.userLastname = body.userLastname;
            newUser.userFirstname = body.userFirstname;
            newUser.userPassword = body.userPassword;
            newUser.userEmail = body.userEmail;
            newUser.roles = body.roles;
            let maxId = 0;
            let found = {
                username: false,
                email: false
            };
            for (let user of users) {
                if (maxId < user.userId) {
                    maxId = user.userId;
                }
                if (user.userLogin == newUser.userLogin) {
                    found.username = true;
                }
                if (user.userEmail == newUser.userEmail) {
                    found.email = true;
                }
            }
            if (!found.username && !found.email) {
                newUser.userId = maxId + 1;
                users.push(newUser);
                let activation = new UserActivation();
                activation.user_id = newUser.userId;
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
            if (!isAdmin() && currentUser().userId !== idFromUrl()) return unauthorized();

            const user = users.find(x => x.userId === idFromUrl());
            return ok(user);
        }

        function forgetPasswordEmailOnly(){
            //Send email forget password
            let user = users.find(x => x.userEmail === body.user_email);
            if (!user) {
                return error("Aucun compte n'existe avec cette adresse mail.");
            }
            return ok({});
        }

        function forgetPassword(){
            let user = users.find(x => x.userId === parseInt(body.user_id));
            if (!user) {
                return error("Utilisateur introuvable");
            }
            //Send email forget password
            return ok({});
        }

        function getMovies() {
            return ok(movies);
        }

        function getMovieById() {
            const movie = movies.find(x => x.movieId === idFromUrl());
            return ok(movie);
        }

        function activate() {
            const user_id = request.params.get('user_id');
            const activation_code = request.params.get('user_activation_code');

            const activation = activations.find(x => x.user_id === parseInt(user_id) && x.user_activation_code === activation_code);
            if (activation) {
                activations = activations.filter(function (element) {
                    return element != activation;
                });
                return ok({ isActivated: true });
            }
            return ok({ isActivated: false });
        }

        function checkUserPassword(){
            const userId = request.params.get('userId');
            const password = request.params.get('password');

            let user = users.find(x => x.userId === parseInt(userId));
            if (!user) {
                return error({unknown : true})
            }
            if(user.userPassword != password){
                return error({unmatch : true})
            }
            return ok({});
        }

        function changeUserInfo() {
            const user_id = body.userId;
            const user_login = body.userLogin;
            const user_firstname = body.userFirstname;
            const user_lastname = body.userLastname;
            const user_email = body.userEmail;
            let user = users.find(x => x.userId === parseInt(user_id));
            if (!user) {
                return error("Utilisateur introuvable");
            }
            user.userLogin = user_login;
            user.userFirstname = user_firstname;
            user.userLastname = user_lastname;
            user.userEmail = user_email;
            return ok({
                userId: user.userId,
                userLogin: user.userLogin,
                userFirstname: user.userFirstname,
                userLastname: user.userLastname,
                roles: user.roles,
                userEmail: user.userEmail,
                token: `fake-jwt-token.${user.userId}`
            });
        }

        function changePassword() {
            const user_id = body.userId;
            const user_password = body.password;

            let user = users.find(x => x.userId === parseInt(user_id));
            if (!user) {
                return error("Utilisateur introuvable");
            }
            user.userPassword = user_password;
            return ok({});
        }

        function getUserCart() {
            let user_id = idFromUrl();
            let cart = carts.filter(function (element) {
                return element.embeddedKeyMovieUser.userId == user_id;
            });
            return ok(cart);
        }

        function addItemToCart() {
            const user_id = body.userId;
            const movie_id = body.movieId;
            const count = body.count;
            if (!users.find(x => x.userId === parseInt(user_id))) {
                return error("Utilisateur inconnu");
            }
            if (!movies.find(x => x.movieId === parseInt(movie_id))) {
                return error("Film inconnu");
            }
            let cart = carts.find(x => x.embeddedKeyMovieUser.userId === parseInt(user_id) && x.embeddedKeyMovieUser.movieId === parseInt(movie_id));
            if (cart) {
                cart.movieUserCartCount = cart.movieUserCartCount + parseInt(count);
            } else {
                let embeddedKeyMovieUser = new EmbeddedKeyMovieUser();
                embeddedKeyMovieUser.userId = parseInt(user_id);
                embeddedKeyMovieUser.movieId = parseInt(movie_id);
                carts.push(
                    {
                        embeddedKeyMovieUser,
                        movieUserCartCount: parseInt(count)
                    }
                )
            }
            return ok({});
        }

        function removeItemToCart() {
            const user_id = body.userId;
            const movie_id = body.movieId;
            const count = body.count;
            if (!users.find(x => x.userId === parseInt(user_id))) {
                return error("Utilisateur inconnu");
            }
            if (!movies.find(x => x.movieId === parseInt(movie_id))) {
                return error("Film inconnu");
            }
            let cart = carts.find(x => x.embeddedKeyMovieUser.userId === parseInt(user_id) && x.embeddedKeyMovieUser.movieId === parseInt(movie_id));
            if (!cart) {
                return error('Panier vide');
            }
            if (parseInt(count) > cart.movieUserCartCount) {
                return error("Nombre d'articles à enlever supérieur au nombre d'article présents");
            }
            if (parseInt(count) != cart.movieUserCartCount) {
                cart.movieUserCartCount -= parseInt(count);
            } else {
                carts = carts.filter(function (element) {
                    return (element.embeddedKeyMovieUser.userId != parseInt(user_id) || element.embeddedKeyMovieUser.movieId != parseInt(movie_id));
                });
            }
            return ok({});
        }

        function clearCart() {
            const user_id = body.userId;
            if (!users.find(x => x.userId === parseInt(user_id))) {
                return error("Utilisateur inconnu");
            }
            let cart = carts.find(x => x.embeddedKeyMovieUser.userId === parseInt(user_id));
            if (!cart) {
                return error('Panier vide');
            } else {
                carts = carts.filter(function (element) {
                    return element.embeddedKeyMovieUser.userId != parseInt(user_id);
                });
            }
            return ok({});
        }

        function mergeItemsToCart() {
            const user_id = body.userId;
            const items = body.localCart;
            for (let localCartItem of items) {
                let item = carts.find(x => x.embeddedKeyMovieUser.userId === user_id && x.embeddedKeyMovieUser.movieId === localCartItem.embeddedKeyMovieUser.movieId);
                if (!item) {
                    localCartItem.embeddedKeyMovieUser.userId = user_id;
                    carts.push(localCartItem);
                } else {
                    item.movieUserCartCount += localCartItem.movieUserCartCount;
                }
            }
            let reportCart = carts.filter(function (element) {
                return element.embeddedKeyMovieUser.userId == user_id;
            });
            return ok({});
        }

        function buyCart() {
            const user_id = body.userId;
            let user = users.find(x => x.userId === user_id);
            if (!user) {
                return error("Utilisateur introuvable");
            }
            const userCart = carts.filter(function (element) {
                return element.embeddedKeyMovieUser.userId == user_id;
            });
            if (!userCart) {
                return error("Panier vide");
            }
            let order : Order = new Order();
            order.purchase_date = new Date().toDateString();
            order.items = new Array<OrderItem>();
            for (let cartItem of userCart) {
                let orderItem : OrderItem = new OrderItem();
                orderItem.movie_id = cartItem.embeddedKeyMovieUser.movieId;
                let movie = movies.find(x => x.movieId === orderItem.movie_id);
                if (!movie) {
                    return error("Film introuvable");
                }
                orderItem.movie_price = movie.moviePrice;
                orderItem.count = cartItem.movieUserCartCount;
                order.items.push(orderItem);
            }
            let userOrderHistory : OrderHistory = orders.find(x => x.userId === user_id);
            if (!userOrderHistory) {
                userOrderHistory = new OrderHistory();
                userOrderHistory.userId = user_id;
                userOrderHistory.orders = new Array<Order>();
                orders.push(userOrderHistory);
            }
            userOrderHistory.orders.push(order);
            carts = carts.filter(function (element) {
                return element.embeddedKeyMovieUser.userId != user_id;
            });
            return ok({});
        }

        function getOrdersByUserId() {
            const user_id : number = idFromUrl();
            let userOrders = orders.find(x => x.userId === user_id);
            if (!userOrders) {
                userOrders = new OrderHistory();
                userOrders.orders = new Array<Order>();
            }
            return ok(userOrders.orders);
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
            return isLoggedIn() && currentUser().roles === [Role.Admin];
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization').split('.')[1]);
            return users.find(x => x.userId === id);
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