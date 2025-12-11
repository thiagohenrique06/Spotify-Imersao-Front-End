console.log("✅ Script 'search.js' foi carregado com sucesso!");

const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

// Função que busca TODOS os artistas e DEPOIS filtra
function requestApi(searchTerm) {
  const url = 'http://localhost:3000/artists';

  fetch(url)
    .then((response) => response.json())
    .then((allArtists) => {
      // Se não houver artistas, não faz nada
      if (!allArtists) return;
      
      // Filtra a lista completa de artistas aqui no JavaScript
      const filteredResults = allArtists.filter((artist) => 
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      console.log("📦 Artistas filtrados:", filteredResults);
      displayResults(filteredResults);
    });
}

// Função que exibe os resultados na tela (não precisa mudar)
function displayResults(results) {
  hidePlaylists();

  if (!results || results.length === 0) {
    // Se não encontrou resultados, esconde a área do artista e mostra as playlists
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }

  const artistImage = document.getElementById("artist-img");
  const artistName = document.getElementById("artist-name");
  const firstResult = results[0];

  artistImage.src = firstResult.urlImg;
  artistName.innerText = firstResult.name;
  resultArtist.classList.remove("hidden");
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

// Evento de digitação na busca (não precisa mudar)
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value; // Não precisa mais do toLowerCase() aqui

    if (searchTerm === "") {
      resultArtist.classList.add("hidden");
      playlistContainer.classList.remove("hidden");
      return;
    }
    
    requestApi(searchTerm);
  });
} else {
  console.error("❌ Erro: Elemento da busca (search-input) não foi encontrado!");
}