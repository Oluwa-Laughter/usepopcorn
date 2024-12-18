import { useEffect, useState } from "react";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import Loader from "./components/Loader";
import MovieList from "./components/MovieList";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import { useMovies } from "./useMovies";
import { useLocaclStorageState } from "./useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selecedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocaclStorageState([], "watched");

  // const [watched, setWatched] = useState([]);
  // const [watched, setWatched] = useState(() => {
  //   const storedWatchlist = localStorage.getItem("watched");
  //   return JSON.parse(storedWatchlist);
  // });

  const handleSelectMovie = (id) => {
    setSelectedId((selecedId) => (id === selecedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const hadleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />}  */}

          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selecedId ? (
            <MovieDetails
              selecedId={selecedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={hadleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
