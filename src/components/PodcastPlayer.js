import React from 'react';
import { useAudio } from '../context/AudioContext';

const PodcastPlayer = () => {
  const { audioFile, isPlaying, playAudio, stopAudio, currentEpisode } = useAudio();

  return (
    <div className="audio-player">
      {audioFile ? (
        <>
          <h3>Now Playing: {currentEpisode ? currentEpisode.episodeTitle || currentEpisode?.title : 'Unknown Episode'}</h3>

          <button className="stop-button" onClick={stopAudio}>Stop</button>
          <button 
            className={`play-pause-button ${isPlaying ? 'pause' : 'play'}`} 
            onClick={() => playAudio(audioFile, currentEpisode)}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </>
      ) : (
        <p>No audio playing</p>
      )}
    </div>
  );
};

export default PodcastPlayer;
