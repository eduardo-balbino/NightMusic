'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import logo from '../assets/icons/Iconarchive-Fairy-Tale-Dark-Moon.512.png';
import playIcon from '../assets/icons/play-icon.png';
import pauseIcon from '../assets/icons/pause-icon.png';
import skipIcon from '../assets/icons/skip-.png';
import returnIcon from '../assets/icons/return-icon.png';

type Track = { id: string; name: string; url: string };

export default function Page(): JSX.Element {
  const [playlist, setPlaylist] = useState<Track[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('playlist') || '[]') as Track[];
    } catch (e) {
      return [];
    }
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (!playlist[currentIndex]) {
      audioRef.current.src = '';
      return;
    }

    audioRef.current.src = playlist[currentIndex].url;
    if (isPlaying) audioRef.current.play();
  }, [currentIndex, playlist, isPlaying]);

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const novas: Track[] = files.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setPlaylist((prev) => {
      const next = [...prev, ...novas];
      if (prev.length === 0 && next.length > 0) {
        setCurrentIndex(0);
      }
      return next;
    });
  };

  const play = () => {
    if (!audioRef.current) return;
    if (playlist.length === 0) return; // nothing to play

    if (!audioRef.current.src) {
      audioRef.current.src = playlist[0].url;
      setCurrentIndex(0);
    }

    try {
      audioRef.current.play();
      setIsPlaying(true);
    } catch (e) {
      // Silently ignore play errors (e.g., NotSupportedError) and keep state consistent
      console.error('Audio play failed:', e);
      setIsPlaying(false);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const nextTrack = () => {
    setIsPlaying(false);
    setCurrentIndex((i) => Math.min(playlist.length - 1, i + 1));
  };

  const prev = () => {
    setIsPlaying(false);
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  return (
    <main className="app-root">
      <div className="app-container">
        <img src={logo.src} alt="logo" className="logo" />

        <div className="player-card">
          {playlist.length === 0 ? (
            <div className="empty-message">
              Nenhuma música carregada. Use o botão de arquivo para adicionar músicas.
            </div>
          ) : (
            <ol className="playlist">
              {playlist.map((m, idx) => (
                <li key={m.id} className={`playlist-item ${idx === currentIndex ? 'current' : ''}`}>
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
