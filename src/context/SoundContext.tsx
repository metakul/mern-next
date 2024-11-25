import React, { createContext, useContext, useState, useRef, useEffect } from "react";

interface SoundContextProps {
  isPlaying: boolean;
  togglePlay: () => void;
  stop: () => void;
}

const SoundContext = createContext<SoundContextProps | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/music/homeMusic.mp3");
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/music/homeMusic.mp3");
    }
    audioRef.current.play().catch((err) => {
      console.error("Failed to play audio:", err);
    });

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <SoundContext.Provider value={{ isPlaying, togglePlay, stop }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
