import { Popular } from "./pages/popular.js"
import { notFound } from "./pages/notFound.js"
import { Movie } from "./pages/movie.js"
import { Bookmarks } from "./pages/bookmarks.js"
import { Search } from "./pages/search.js"

// Popular();
// need to try to make safeMovie function from this video https://www.youtube.com/watch?v=2hJ1rTANVnk&ab_channel=MelvinAdekanye
const routes = [
    {
        match: (url) => {
            return url === '/';
        },
        renderRoute: Popular,
    },
    {
        match: (url) => {
            return url.includes('/search');
        },
        renderRoute: Search,
    },
    {
        match: (url) => {
            return url.includes('/bookmarks');
        },
        renderRoute: Bookmarks,
    },
    {
        match: (url) => {
            return url.includes('/movie/');
        },
        renderRoute: Movie,
    },
    {
        match: () => true,
        renderRoute: notFound,
    }
];
// Popular();

class Router {
    constructor(routes) {
        this._routes = routes;

        window.history.pushState = (data, title, ulr) => {
            History.prototype.pushState.apply(window.history, [data, title, ulr]);
            this.reroute();
        }

        window.onpopstate = () => {
            this.reroute();
        }
    }

    reroute() {
        const matchedRoute = this._routes.find(route => {
            const matched = route.match(window.location.pathname)
            return matched;
        })

        matchedRoute.renderRoute();
    }
}

const router = new Router(routes);

router.reroute();