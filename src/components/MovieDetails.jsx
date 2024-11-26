import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import { useKey } from "../useKey";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetails({ selecedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const countRef = useRef(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selecedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selecedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selecedId,
      title,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  // if (imdbRating > 8) [isTop, setIsTop] = useState(true);

  // if (imdbRating > 8) return <p>Great!!</p>;

  // const [isTop, setIsTop] = useState(imdbRating > 8);
  // console.log(isTop);

  // useEffect(() => {
  //   setIsTop(imdbRating > 8);
  // }, [imdbRating]);

  // const isTop = imdbRating > 8;
  // console.log(isTop);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      const getMovieDetails = async () => {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selecedId}`
        );

        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      };
      getMovieDetails();
    },
    [selecedId]
  );

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />

            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>

              <p>{genre}</p>

              <p>
                <span>⭐️</span>
                <span>{imdbRating} IMDb rating </span>
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onMovieRate={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>

            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
