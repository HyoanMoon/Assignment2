import express from 'express';

/**  Temporary section **/

import Movie from '../Models/movie';

// import { UserDisplayName } from '../Util'; 

export function DisplayMovieList(req: express.Request, res: express.Response , next: express.NextFunction)
{
  Movie.find(function(err, moviesCollections)
  {
    if(err)
    {
        console.error(err);
        res.end(err);
    }
    res.render('index', {title: 'Movie List', page: 'movie-list', movies: moviesCollections, displayName: ''});

  })
}