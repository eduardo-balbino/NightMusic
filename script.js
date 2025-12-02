// ---------- DOM ----------
const audioPlayer = document.getElementById("audio-player")
const btnReturn = document.getElementById("return-button")
const btnPlay = document.getElementById("play-button")
const btnPause = document.getElementById("pause-button")
const btnSkip = document.getElementById("skip-button")
const input = document.getElementById("musicas")


// ---------- Estado ----------
const playlist = []
const musicaAtual = 0

// ---------- Carregar playlist existente ----------
const storage = localStorage.getItem("playlists")
if(storage) {
    playlist = JSON.parse(storage)
}

// ---------- Atualiza o audioPlayer com a música atual ----------
function carregarMusica() {
    if(playlist.length === 0) return

    const musica = playlist[musicaAtual]
    audioPlayer.src = musica.url
} 


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

    // Salvar
    localStorage.setItem('playlist', JSON.stringify(playlist))
    
    
    console.log('playlist:', playlist)
   
   
    //Se for a primeira vez carrega a musica para tocar
    if(playlist.length === arquivos.length) {
        carregarMusica()
    }
})


// ---------- Botões ----------
btnPlay.addEventListener('click', () => {
    audioPlayer.play()
    alert('play')
})

btnPause.addEventListener('click', () => {
    audioPlayer.pause()
})