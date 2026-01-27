import playIcon from "../assets/icons/play-icon.png"
import downloadIcon from "../assets/icons/download-icon.png"
import playShuffle from "../assets/icons/shuffle-icon.png"
import PlaylistButton from "./PlaylistButton.js"
import { Playlist, Song } from "@app/dashboard/[playlistId]/page.js"
import helloWorld from "../assets/mockImages/hello-world.webp"


export default function PlaylistHeader({ playlist }: { playlist: Playlist }) {

    return (
        <header className="playlist-header">
            <div className="flex flex-col items-center ml-7">
                <img src={helloWorld.src} alt="capa da playlist" className="playlist-cover" />
                <div className="w-full grid grid-cols-3 playlist-buttons">
                    <PlaylistButton src={playIcon.src} alt="Botão de play" />
                    <PlaylistButton src={downloadIcon.src} alt="Botão de download" />
                    <PlaylistButton src={playShuffle.src} alt="Botão de modo shuffle" />
                </div>
            </div>
            <div>
                <h1 className="mb-4">{playlist.playlistName}</h1>
                <p className="">{playlist.songs.length} {playlist.songs.length > 1 ? 'músicas' : 'música'},
                    cerca de {getPlaylistDuration(playlist.songs)}</p>
                <p className="">{playlist.description}</p>
            </div>
        </header>
    )
}

function getPlaylistDuration(songs: Song[]) {

    const HOUR_IN_SECS = 3600

    const fullDurationSecs = songs.reduce((acc, curr) => acc += curr.duration, 0)

    if (fullDurationSecs >= HOUR_IN_SECS) {

        const [durationHour, minutes] = (fullDurationSecs / HOUR_IN_SECS).toString()
            .split('.')
        const fixedMinutes = (Number(minutes) * 60).toString()
            .slice(0, 1)

        return `${Number(durationHour) > 1 ? durationHour + ' horas' : durationHour + ' hora'} 
                ${Number(fixedMinutes) > 0 ? `e ${fixedMinutes} minutos` : ''}`
    }
    return `${fullDurationSecs.toString().slice(0, 2)} minutos`
}