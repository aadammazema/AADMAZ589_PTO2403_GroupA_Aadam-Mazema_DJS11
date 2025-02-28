import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
);

const ShowDetail = () => {
  const [show, setShow] = useState(null);
  const { showId } = useParams();

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${showId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.seasons) {
          setShow(data);
        } else {
          console.error("Invalid show data:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching show data:", error);
      });
  }, [showId]);

  if (!show) return <LoadingSpinner />; 

  return (
    <div className="show-detail">
      <Link to="/showlist">
        <button className="view-all-button return-button">Return</button>
      </Link>

      <h1 className="main-title">ListenUp.</h1>
      <p>Your World, Your Sound.</p>
      <h2>{show.title}</h2>
      <img src={show.image} alt={show.title} />
      <p>{show.description}</p>
      <div className="last-updated-box">
        <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
      </div>
      <p>Seasons: {show.seasons.length}</p> 
      <h2>Seasons</h2>
      <div className="show-list">
        {show.seasons && show.seasons.length > 0 ? (
          show.seasons.map((season, index) => (
            <div
              key={index}
              className="show-card"
              style={{ width: "auto", marginBottom: "20px" }}
            >
              
              <Link to={`/show/${showId}/season/${index}`} className="season-link">
                <div className="season-container">
                  <img
                    src={season.image}
                    alt={`Season ${index + 1}`}
                    className="season-image"
                  />
                  <h3 className="season-title">{season.title}</h3>
                  <p className="episodes-count">
                    Episodes: {season.episodes ? season.episodes.length : 0}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No seasons available.</p> 
        )}
      </div>
    </div>
  );
};

export default ShowDetail;
