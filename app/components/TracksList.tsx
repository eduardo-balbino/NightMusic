import { Song } from "@app/dashboard/[playlistId]/page.js"
import clockIcon from "../assets/icons/clock-icon.png"
import Track from "./Track.js"


export default function TracksList({songs}: {songs: Song[]}) {

    return(
        <div className="track-list pt-2 pb-2">
        <div className="tracks-grid pb-2 border-b border-gray-50 border-solid">
            <h3 className="pl-4"><b>Título</b></h3>
            <h3><b>Adicionado em</b></h3>
            <img src={clockIcon.src}></img>
        </div>
        {songs.map((s,index) => <Track key={index} song={s}/>)}
        </div>
    )
}