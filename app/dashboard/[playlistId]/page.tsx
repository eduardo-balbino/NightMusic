"use client";
import PlaylistHeader from "@components/PlaylistHeader.js";
import TracksList from "@components/TracksList.js";
import { useParams } from "next/navigation.js";
import { mockPlaylists } from "../page.js";
export interface Song {
  title: string;
  artistName: string;
  album: string;
  duration: number;  
  genre: string;
  fileUrl: string;
  createdAt: string;  // ISO date (YYYY-MM-DD)
  image: string;      // vazio por enquanto
}

export interface Playlist {
  playlistName: string;
  description: string
  playlistId: string; 
  image: string;      // vazio por enquanto
  songs: Song[];
}

export default function Playlist() {

    const {playlistId} = useParams() //fazer fetching com o Id quando integrar com o backend

    const playlist = mockPlaylists.find(p => p.playlistId === playlistId)

    if (!playlist) return //adicionar mensagem de erro depois

    return(
        <>
        <PlaylistHeader playlist={playlist}/>
        <TracksList songs={playlist.songs}/>
        </>
    )
}