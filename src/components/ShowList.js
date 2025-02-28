import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchandSort from './searchandsort'; // Import your search and sort component

const genreMapping = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family"
};

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track the loading state
  const [selectedGenre, setSelectedGenre] = useState(""); // Track the selected genre

  useEffect(() => {
    // Fetch the list of shows
    fetch("https://podcast-api.netlify.app")
      .then(response => response.json())
      .then(data => {
        const updatedShows = data.map(show => {
          const genreTitles = show.genres.map(genreId => genreMapping[genreId]);
          return {
            ...show,
            genreTitles
          };
        });
        updatedShows.sort((a, b) => a.title.localeCompare(b.title));
        setShows(updatedShows);
        setFilteredShows(updatedShows);
        setIsLoading(false); // Set loading to false when data is fetched
      });
  }, []);

  const handleGenreChange = (event) => {
    const genre = event.target.value;
    setSelectedGenre(genre);

    // Filter shows by the selected genre
    if (genre === "") {
      setFilteredShows(shows); // If no genre is selected, show all
    } else {
      const filtered = shows.filter(show =>
        show.genreTitles.includes(genre)
      );
      setFilteredShows(filtered);
    }
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    ); 
  }

  return (
    <div>
      <Link to="/">
        <button className="view-all-button return-button">Return</button>
      </Link>

      <h1 className="main-title">ListenUp.</h1>
      <p>Your World, Your Sound.</p>
      <SearchandSort shows={shows} setFilteredShows={setFilteredShows} />
      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        className="sort-bar"
      >
        <option value="">All Genres</option>
        {Object.values(genreMapping).map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      
      
      <div className="show-list">
        {filteredShows.map(show => (
          <div key={show.id} className="show-card">
            <Link to={`/show/${show.id}`} className="show-card-link">
              <div className="show-card-content">
                <img src={show.image} alt={show.title} />
                <h2>{show.title}</h2>
                <p>Genres: {show.genreTitles.join(", ")}</p>
                <div className="seasons-box"><p>Seasons: {show.seasons}</p></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/favorites">
        <button className="view-all-button favorites-button">View Favorites</button>
      </Link>
    </div>
  );
};

export default ShowList;

