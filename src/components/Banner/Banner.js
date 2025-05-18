import { useState, useEffect } from "react";
import Axios from "../../utils/Axios";
import Requests from "../../utils/Requests";

import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(Requests.fetchNetflixOriginals);
        const results = response.data.results;
        const randomIndex = Math.floor(Math.random() * results.length);
        setMovie(results[randomIndex]);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url("http://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <p className="banner_description">{truncate(movie?.overview, 150)}</p>
      </div>
      <div className="banner_fadeBottom" />
    </div>
  );
};

export default Banner;
