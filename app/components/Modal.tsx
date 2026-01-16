import { Dispatch, SetStateAction, useRef } from "react"

export default function Modal({setShowModal}: {setShowModal: Dispatch<SetStateAction<boolean>>}) {

    const modalRef = useRef<HTMLDialogElement | null>(null)
    
    return(
        
        <dialog className="dialog" ref={modalRef}>
        <form>
            <fieldset>
                <legend>Playlist</legend>

                <label htmlFor="playlistName">playlistName</label>
                <br />
                <input type="text" id="playlistName" name="playlistName" className="" />
                <br />
                <label htmlFor="description">description</label>
                <br />
                <textarea id="description" name="description"></textarea>
                <br />
                <label htmlFor="playlistId">playlistId</label>
                <br />
                <input type="text" id="playlistId" name="playlistId" />
                <br />
                <label htmlFor="image">image</label>
                <br />
                <input type="text" id="image" name="image" />
            </fieldset>
            <fieldset>
                <legend>Song</legend>

                <label htmlFor="title">title</label>
                <br />
                <input type="text" id="title" name="title" />
                <br />
                <label htmlFor="artistName">artistName</label>
                <br />
                <input type="text" id="artistName" name="artistName" />
                <br />
                <label htmlFor="album">album</label>
                <br />
                <input type="text" id="album" name="album" />
                <br />
                <label htmlFor="duration">duration</label>
                <br />
                <input type="number" id="duration" name="duration" />
                <br />
                <label htmlFor="genre">genre</label>
                <br />
                <input type="text" id="genre" name="genre" />
                <br />
                <label htmlFor="fileUrl">fileUrl</label>
                <br />
                <input type="url" id="fileUrl" name="fileUrl" />
                <br />
                <label htmlFor="createdAt">createdAt</label>
                <br />
                <input type="date" id="createdAt" name="createdAt" />
                <br />
                <label htmlFor="image">image</label>
                <br />
                <input type="text" id="image" name="image" />
            </fieldset>

            <button type="submit" className="btn" onClick={(e) => {
                e.preventDefault()
                setShowModal(false)
                }}>Enviar</button>

        </form>

    </dialog>
)
}