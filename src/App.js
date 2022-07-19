import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchIcon from './search.svg';
import './App.css';
import Movie from './components/Movie';

const baseUrl = "https://www.omdbapi.com/?apikey=10d2a084";


function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  // Create a function to get the data from the API 
  const getMovieData = async (title) => {
    const response = await axios.get(`${baseUrl}&s=${title}`);
    setMovies(response.data.Search);
  }

  useEffect(() => {
    getMovieData("The Matrix");
  }
    , []);

  return (
    <div className="app">

      <h1>Movie Land</h1>
      <div className="search">
        <input placeholder='Search for movies' value={search} onChange={(e) => { setSearch(e.target.value) }} />
        <img src={SearchIcon} alt="search" onClick={() => { getMovieData(search) }} />
      </div>
      <div className='container'>
        {
          movies?.length > 0
            ?
            (
              movies.map((movie) => {
                return <Movie key={movie.imdbID} movie={movie} />
              } // end of map
              )
            ) : (
              <div className="empty">
                <h2>No movies found</h2>
              </div>
            )
        }

      </div>
    </div>
  );
}

export default App;
