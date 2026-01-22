import { Song } from "@app/dashboard/[playlistId]/page.js"
import helloWorld from "../assets/mockImages/hello-world.webp"
export default function Track({ song }: { song: Song }) {

    return (
        <div className="tracks-grid pl-4  hover:bg-gray-600 hover:cursor-pointer track">
            <div className="flex items-center">
                <img src={helloWorld.src} alt="imagem da música" className="track-image" />
                <div>
                    <p className="text-white"><b>{song.title}</b></p>
                    <p>{song.artistName}</p>
                </div>
            </div>
            <p>{userFriendlyDate(song.createdAt)}</p>
            <p>{convertToMinutes(song.duration)}</p>
        </div>
    )
}

function userFriendlyDate(createdAt: string) {

    const date = new Date(createdAt);
    const formatter = new Intl.DateTimeFormat("pt-br", { month: "long", day: "numeric", year: "numeric" });
    
    return formatter.format(date);
}

function convertToMinutes(totalSecs: number) {

    const [minutes, rawSecs] = (totalSecs / 60).toString()
        .split('.')

    const adjustedSecs = Number(rawSecs) * 60
    return minutes + ":" + adjustedSecs.toString()
        .slice(0, 2)
}