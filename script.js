// ---------- DOM ----------
const audioPlayer = document.getElementById("audio-player")
const btnReturn = document.getElementById("return-button")
const btnPlay = document.getElementById("play-button")
const btnPause = document.getElementById("pause-button")
const btnSkip = document.getElementById("skip-button")
const input = document.getElementById("musicas")
const playlist = []


// ---------- Upload ----------
input.addEventListener('change', (event) => {
    const arquivos = event.target.files
    
    for (let arquivo of arquivos) {
       const musica = {
           id: crypto.randomUUID,
           name: arquivo.name,
           url: URL.createObjectURL(arquivo)
        } 
        
        playlist.push(musica)
    }
    
    audioPlayer.src = url

    // Salvar
    localStorage.setItem('playlist', JSON.stringify(playlist))
    const playlists = JSON.parse(localStorage.getItem('playlist') || [])
    
    console.log(playlists)
})


// ---------- Botões ----------
btnPlay.addEventListener('click', () => {
    audioPlayer.play()
    alert('play')
})

btnPause.addEventListener('click', () => {
    audioPlayer.pause()
})