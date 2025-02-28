import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowList from "./components/ShowList";
import ShowDetail from "./components/ShowDetail";
import LandingPage from "./components/landingPage";
import SeasonDetail from "./components/ShowDetailPage";
import FavoritesPage from "./components/FavoritesPage";
import AudioPlayer from "./components/PodcastPlayer";
import { AudioProvider } from "./context/AudioContext";

const App = () => {
  return (
    <AudioProvider>
      {" "}
      {}
      <div className="App">
        <Router>
          <AudioPlayer /> {}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/showlist" element={<ShowList />} />
            <Route path="/show/:showId" element={<ShowDetail />} />
            <Route
              path="/show/:showId/season/:seasonIndex"
              element={<SeasonDetail />}
            />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </Router>
      </div>
    </AudioProvider>
  );
};

export default App;
