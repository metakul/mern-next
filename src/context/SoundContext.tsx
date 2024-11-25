import React, { createContext, useContext, useState, useRef, useEffect } from "react";

interface SoundContextProps {
  isPlaying: boolean;
  togglePlay: () => void;
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

  useEffect(() => {
    // Automatically play sound on load
    if (!audioRef.current) {
      audioRef.current = new Audio("/music/homeMusic.mp3");
    }
    const playAudio = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Audio playback failed:", err);
      }
    };

    playAudio();

    return () => {
      // Cleanup audio on unmount
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <SoundContext.Provider value={{ isPlaying, togglePlay }}>
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
