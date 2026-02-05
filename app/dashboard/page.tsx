"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../assets/icons/Iconarchive-Fairy-Tale-Dark-Moon.512.png"
import Nav from "@components/Nav";
import Profile from "@components/Profile";
import PlaylistHeader from "@components/PlaylistHeader.js";
import TracksList from "@components/TracksList.js";

export const mockPlaylists = [
  {
    "playlistName": "Hello World",
    "description": "golden oldies",
    "playlistId": "a3f9c2e1",
    "image": "",
    "songs": [
      {
        "title": "Space Oddity",
        "artistName": "David Bowie",
        "album": "David Bowie",
        "duration": 315,
        "genre": "Rock",
        "fileUrl": "https://dzcdn.net/spaceoddity",
        "createdAt": "1969-07-11",
        "image": ""
      },
      {
        "title": "Bohemian Rhapsody",
        "artistName": "Queen",
        "album": "A Night at the Opera",
        "duration": 355,
        "genre": "Rock",
        "fileUrl": "https://dzcdn.net/bohemian",
        "createdAt": "1975-10-31",
        "image": ""
      },
      {
        "title": "Hotel California",
        "artistName": "Eagles",
        "album": "Hotel California",
        "duration": 390,
        "genre": "Rock",
        "fileUrl": "https://dzcdn.net/hotelcal",
        "createdAt": "1976-12-08",
        "image": ""
      }
    ]
  },
  {
    "playlistName": "Single Track",
    "description": "apenas uma, por enquanto",
    "playlistId": "f4b7c9d2",
    "image": "",
    "songs": [
      {
        "title": "Imagine",
        "artistName": "John Lennon",
        "album": "Imagine",
        "duration": 184,
        "genre": "Rock",
        "fileUrl": "https://dzcdn.net/imagine",
        "createdAt": "1971-10-11",
        "image": ""
      }
    ]
  }
]

export default function Dashboard({children}: {children: React.ReactNode}) {
  const [ready, setReady] = useState(false);
  const router = useRouter();

  
  return (
    <div className="min-h-screen grid-columns">
      <div className="logo-div"><img src={logo.src} alt="the app's logo" className="logo" /></div>
      <Profile />
      <Nav playlists={mockPlaylists}/>
      <div>
      {children}
      </div>
    </div>
  );
}
