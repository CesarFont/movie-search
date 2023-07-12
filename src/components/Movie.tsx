import React from 'react';

interface Movie {
  id: number;
  title: string;
  year: string;
  poster: string;
}

interface Props {
  movies: Movie[];
}

const ListOfMovies: React.FC<Props> = ({ movies }) => {
  return movies.map((movie: Movie) => (
    <div className='movie-container' key={movie.id}>
      <img src={movie.poster} alt={movie.title} className='movie-poster' />
      <h1 className='movie-title'>{movie.title}</h1>
      <h3 className='movie-year'>{movie.year}</h3>
    </div>
  ));
};

const NoMoviesResult: React.FC = () => {
  return (
    <div className='no-movies-result'>
      <h1>No movies found</h1>
    </div>
  );
};

export const Movies: React.FC<Props> = ({ movies }) => {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />;
};
