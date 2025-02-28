import React, { createContext, useState, useContext, useEffect } from "react";

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const audioRef = React.useRef(new Audio());

  const playAudio = (file, episode) => {
    if (audioFile !== file || currentEpisode?.episodeTitle !== episode.episodeTitle) {
      audioRef.current.src = file;
      audioRef.current.play();
      setAudioFile(file);
      setCurrentEpisode(episode);
      setIsPlaying(true);
    } else {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setAudioFile(null);
    setIsPlaying(false);
    setCurrentEpisode(null);
  };

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
        currentEpisode,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
