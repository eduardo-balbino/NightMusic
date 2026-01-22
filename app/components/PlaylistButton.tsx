type PlaylistButtonProps = {
    src: string,
    alt: string
}

export default function PlaylistButton({src, alt}: PlaylistButtonProps) {

    return (
        <>
            <button>
                <img src={src} alt={alt} className="playlist-button w-10 h-10" />
            </button>
        </>
    )
}