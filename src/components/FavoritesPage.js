import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAudio } from "../context/AudioContext"; 

const FavoritesPage = () => {
  const { playAudio } = useAudio(); 
  const [favorites, setFavorites] = useState([]);
  const [sortOption, setSortOption] = useState("newest"); 

  
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  
  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  
  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortOption === "A-Z") {
      return a.showTitle?.localeCompare(b.showTitle); 
    } else if (sortOption === "Z-A") {
      return b.showTitle?.localeCompare(a.showTitle); 
    } else if (sortOption === "newest") {
      return new Date(b.addedDate) - new Date(a.addedDate); 
    } else if (sortOption === "oldest") {
      return new Date(a.addedDate) - new Date(b.addedDate); 
    }
    return 0;
  });

  
  const removeFavorite = (episodeTitle) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.episodeTitle !== episodeTitle
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-page">
      <Link to="/showlist">
        <button className="view-all-button return-button">Return</button>
      </Link>

      <h1 className="main-title">My Favorites</h1>

      
      <select className="sort-bar" value={sortOption} onChange={handleSort}>
        <option value="A-Z">Sort A-Z</option>
        <option value="Z-A">Sort Z-A</option>
        <option value="newest">Most Recently Added</option>
        <option value="oldest">Least Recently Added</option>
      </select>

      
      <div className="favorites-list">
        {sortedFavorites.length > 0 ? (
          sortedFavorites.map((favorite) => (
            <div key={favorite.episodeTitle} className="favorite-item"> 
              <div className="favorite-item-content">
                <div className="favorite-episode-details">
                  <h2>Show: {favorite.showTitle || "Unknown Show"}</h2>

                  
                  <p>
                    Added on: {new Date(favorite.addedDate).toLocaleString()}
                  </p>

                  
                  <button
                    className="episode-button"
                    onClick={() => {
                      console.log("Playing audio for:", favorite); 
                      console.log("Episode Audio URL:", favorite.episodeAudio); 
                      console.log("Episode Title:", favorite.episodeTitle); 
                      playAudio(favorite.episodeAudio, favorite); 
                    }}
                  >
                    {favorite.episodeTitle || "Unknown Episode"}
                  </button>

                 
                  <button
                    className="addtofavorites"
                    onClick={() => removeFavorite(favorite.episodeTitle)} 
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No favorite episodes added yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;




