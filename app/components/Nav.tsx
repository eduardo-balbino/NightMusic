"use client";
import { useState } from "react";
import Modal from "./Modal.js";
import { NavLink } from "./NavLink.js";
import { Playlist } from "@app/dashboard/[playlistId]/page.js";

export default function Nav({ playlists }: { playlists: Playlist[] }) {

    const [showModal, setShowModal] = useState(false)

    return (
        <nav className="nav w-fit h-screen *:block">
            {showModal && <Modal setShowModal={setShowModal}/>}
            <h2><b>Playlists</b></h2>
            <button className="create-playlist" onClick={() => setShowModal(true)}>Criar Playlist</button>
            {playlists.map((p, index) => <NavLink key={index} href={`/dashboard/${p.playlistId}`}>{p.playlistName}</NavLink>)}
        </nav>
    )
}