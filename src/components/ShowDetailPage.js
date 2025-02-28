import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAudio } from "../context/AudioContext";

const ShowDetailPage = () => {
  const { showId, seasonIndex } = useParams();
  const { playAudio } = useAudio();
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${showId}`)
      .then((response) => response.json())
      .then((data) => {
        setShow(data);
        if (seasonIndex && data.seasons[seasonIndex]) {
          setSelectedSeason(data.seasons[seasonIndex]);
        }

        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
      })
      .catch((error) => {
        console.error("Error fetching show data:", error);
      });
  }, [showId, seasonIndex]);

  const handleSeasonClick = (index) => {
    setSelectedSeason(show.seasons[index]);
  };

  const handleAddToFavorites = (episode) => {
    const newFavorite = {
      showTitle: show.title,
      episodeTitle: episode.title,  
      episodeAudio: episode.file,    
      addedDate: new Date().toISOString(),
    };

    const updatedFavorites = [...favorites];
    
    
    if (favorites.some((fav) => fav.showTitle === newFavorite.showTitle && fav.episodeTitle === newFavorite.episodeTitle)) {
      
      const filteredFavorites = updatedFavorites.filter(
        (fav) => !(fav.showTitle === newFavorite.showTitle && fav.episodeTitle === newFavorite.episodeTitle)
      );
      setFavorites(filteredFavorites);
      localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
    } else {
      
      updatedFavorites.push(newFavorite);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  if (!show) return <div>Loading...</div>;

  return (
    <div className="show-detail-page">
      <Link to="/showlist">
        <button className="return-button">Return</button>
      </Link>

      <h1>{show.title}</h1>
      <img src={show.image} alt={show.title} className="show-image" />

      {selectedSeason === null ? (
        <div>
          <h2>Seasons</h2>
          <ul className="season-list">
            {show.seasons.map((season, index) => (
              <li key={season.id} onClick={() => handleSeasonClick(index)} className="season-item">
                <h3>{season.title}</h3>
                <img src={season.image} alt={season.title} className="season-image" />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Season: {selectedSeason.title}</h2>
          <h3>Episodes</h3>
          <ul className="episode-list">
            {selectedSeason.episodes.map((episode, index) => (
              <li key={episode.id} className="episode-item">
                <button
                  className="episode-button"
                  onClick={() => playAudio(episode.file, episode)} 
                >
                  {episode.title}
                </button>
                <button
                  className="addtofavorites"
                  onClick={() => handleAddToFavorites(episode)}
                >
                  {favorites.some((fav) => fav.showTitle === show.title && fav.episodeTitle === episode.title)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowDetailPage;






