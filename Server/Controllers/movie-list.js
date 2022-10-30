"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeletePage = exports.ProcessEditPage = exports.ProcessAddPage = exports.DisplayEditPage = exports.DisplayAddPage = exports.DisplayMovieList = void 0;
const movie_1 = __importDefault(require("../Models/movie"));
function DisplayMovieList(req, res, next) {
    movie_1.default.find(function (err, moviesCollections) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Movie List', page: 'movie-list', movies: moviesCollections, displayName: '' });
    });
}
exports.DisplayMovieList = DisplayMovieList;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'edit', movie: '', displayName: '' });
    res.redirect('/movie-list');
}
exports.DisplayAddPage = DisplayAddPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    movie_1.default.findById(id, {}, {}, function (err, movieToEdit) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'edit', movie: movieToEdit, displayName: '' });
    });
}
exports.DisplayEditPage = DisplayEditPage;
function ProcessAddPage(req, res, next) {
    let newMovie = new movie_1.default({
        "Name": req.body.movieName,
        "Director": req.body.movieDirector,
        "Year": req.body.movieYear,
        "Rating": req.body.movieRating
    });
    movie_1.default.create(newMovie, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/movie-list');
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedMovie = new movie_1.default({ "_id": id,
        "name": req.body.movieName,
        "Director": req.body.movieDirector,
        "Year": req.body.movieYear,
        "Rating": req.body.movieRating
    });
    movie_1.default.updateOne({ _id: id }, updatedMovie, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/movie-list');
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    movie_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/movie-list');
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
//# sourceMappingURL=movie-list.js.map