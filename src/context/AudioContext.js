import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context for the audio player
const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null); // New state for the current episode
  const audioRef = React.useRef(new Audio());

  const playAudio = (file, episode) => {
    // Check if we need to play a new episode
    if (audioFile !== file || currentEpisode?.episodeTitle !== episode.episodeTitle) {
      audioRef.current.src = file;  // Set the new audio file
      audioRef.current.play();  // Play the new audio
      setAudioFile(file);  // Set the current audio file in state
      setCurrentEpisode(episode);  // Set the current episode in state
      setIsPlaying(true);  // Set the playing state to true
    } else {
      // If the same episode, toggle play/pause
      if (audioRef.current.paused) {
        audioRef.current.play();  // Play the audio if it was paused
        setIsPlaying(true);  // Update the playing state
      } else {
        audioRef.current.pause();  // Pause the audio
        setIsPlaying(false);  // Update the playing state
      }
    }
  };
  

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset audio playback
    setAudioFile(null);
    setIsPlaying(false);
    setCurrentEpisode(null); // Clear current episode
  };

  // Cleanup when the component unmounts
  useEffect(() => {
    return () => {
      audioRef.current.pause();
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        audioFile,
        isPlaying,
        playAudio,
        stopAudio,
        currentEpisode, // Provide current episode to context
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};