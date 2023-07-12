// 8bca8940
// http://www.omdbapi.com/?apikey=[yourkey]&

import { useState, useDeferredValue, useEffect, useCallback } from 'react';

import { useMovies, useSearch, useDebounce } from './hooks/index';
import { Movies } from './components/index';

function App() {
  const [sort, setSort] = useState(false);
  const { result, setResult, error } = useSearch();
  const debouncedResult = useDebounce(result);
  const { movies, getMovies, loading } = useMovies(result, sort);
  // const deferredSearch = useDeferredValue(result);

  const handleSubmit = e => {
    e.preventDefault();
    getMovies(result);
  };
  useEffect(() => {
    getMovies(debouncedResult);
  }, [debouncedResult]);

  const handleChange = e => {
    const search = e.target.value;
    setResult(search);
  };

  const handleSort = e => {
    setSort(!sort);
  };
  return (
    <>
      <div className='container'>
        <header>
          <form className='movie-form' onSubmit={handleSubmit}>
            <h1>Movies:</h1>
            <input
              name='text'
              onChange={handleChange}
              type='text'
              value={result}
              placeholder='Type to search a movie..'
            />
            <input type='checkbox' onChange={handleSort} checked={sort} />
            <button>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {console.log(loading)}
            {loading && <p style={{ color: 'white', fontSize: '20px' }}>Loading...</p>}
          </form>
        </header>
        <main>
          <Movies movies={movies} />
        </main>
      </div>
    </>
  );
}

export default App;

// const [movies, setMovies] = useState([]);

// const handleSubmit = e => {
//   e.preventDefault();
//   getMovies(result);
// };
