const input = document.getElementById("musicas")
const playlist = []

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
      

    console.log(playlist)
})

