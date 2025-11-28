const input = document.getElementById("musicas")
const playlist = []

//Upload Músicas
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
    
    //Salva no localStorage
    localStorage.setItem('playlist', JSON.stringify(playlist))
    const playlists = JSON.parse(localStorage.getItem('playlist') || [])

    console.log(playlist)
})

