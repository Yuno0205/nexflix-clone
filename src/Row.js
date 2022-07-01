
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      //player
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    console.log("This movie :" , movie)
    if (trailerUrl) {
     
      setTrailerUrl("")
     
    } else {
      movieTrailer(movie?.name || "")
      
        .then((url) => {
           if(url){
            const urlParams = new URLSearchParams(new URL(url).search);
            console.log("v : " , urlParams)
            setTrailerUrl(urlParams.get('v'));
           } else{
            alert("This movie not have a trailer")
            setTrailerUrl("dQw4w9WgXcQ")
           } 
          
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster  ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          ></img>
        ))}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
