const API_URL = 'http://www.omdbapi.com/?apikey=8bca8940';

export interface Movie {
  id: string;
  title: string;
  year: number;
  poster: string;
}

export const fetchMovies = async (search: string): Promise<Movie[]> => {
  if (!search || search === '') return [];
  try {
    const response = await fetch(`${API_URL}&s=${search}`);
    const json = await response.json();
    const movies = json.Search;

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
    }));
  } catch (error) {
    throw new Error('Error while loading movie');
  }
};
