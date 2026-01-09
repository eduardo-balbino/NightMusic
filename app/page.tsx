"use client";

import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import logo from "./assets/icons/Iconarchive-Fairy-Tale-Dark-Moon.512.png";
import playIcon from "./assets/icons/play-icon.png";
import pauseIcon from "./assets/icons/pause-icon.png";
import skipIcon from "./assets/icons/skip-.png";
import returnIcon from "./assets/icons/return-icon.png";

type Track = { id: string; name: string; url: string };

export default function Page(): JSX.Element | null {
  // Mock de autenticação simples
  const [isAuthenticated, _setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return Boolean(localStorage.getItem("nm_token"));
    }
    return false;
  });

  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handler para arquivos
  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    const novas: Track[] = files.map((file) => ({
      id: crypto.randomUUID(),
      name: (file as File).name,
      url: URL.createObjectURL(file as Blob),
    }));

    setPlaylist((prev: Track[]) => {
      const next = [...prev, ...novas];
      if (prev.length === 0 && next.length > 0) {
        setCurrentIndex(0);
      }
      return next;
    });
  };

  const play = () => {
    if (!audioRef.current) {
      return;
    }
    if (playlist.length === 0) {
      return;
    } // nothing to play

    if (!audioRef.current.src) {
      audioRef.current.src = playlist[0].url;
      setCurrentIndex(0);
    }

    try {
      audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const pause = () => {
    if (!audioRef.current) {
      return;
    }
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const nextTrack = () => {
    setIsPlaying(false);
    setCurrentIndex((i: number) => Math.min(playlist.length - 1, i + 1));
  };

  const prev = () => {
    setIsPlaying(false);
    setCurrentIndex((i: number) => Math.max(0, i - 1));
  };

  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  return (
    <main className="app-root">
      <div className="app-container">
        <img src={logo.src} alt="logo" className="logo" />

        <div className="player-card">
          {playlist.length === 0 ? (
            <>
              <img src={logo.src} alt="logo" className="logo" />
              <div className="empty-message">
                Nenhuma música carregada. Use o botão de arquivo para adicionar músicas.
              </div>
            </>
          ) : (
            <ol className="playlist">
              {playlist.map((m, idx) => (
                <li key={m.id} className={`playlist-item ${idx === currentIndex ? "current" : ""}`}>
                  {m.name}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <div className="file-input-wrapper">
        <input
          id="musicas"
          type="file"
          multiple
          accept="audio/*"
          onChange={handleFiles}
          className="file-input"
        />
      </div>

      <div className="controls-bar">
        <button onClick={prev} className="control-btn">
          <img src={returnIcon.src} alt="prev" className="icon-img" />
        </button>

        {!isPlaying ? (
          <button onClick={play} className="control-btn">
            <img src={playIcon.src} alt="play" className="icon-img" />
          </button>
        ) : (
          <button onClick={pause} className="control-btn">
            <img src={pauseIcon.src} alt="pause" className="icon-img" />
          </button>
        )}

        <button onClick={nextTrack} className="control-btn">
          <img src={skipIcon.src} alt="next" className="icon-img" />
        </button>
      </div>

      <audio ref={audioRef} id="audio-player" />
    </main>
  );
}
