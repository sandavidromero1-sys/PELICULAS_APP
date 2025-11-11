const API_KEY = "7a732f1f";
const inputBuscar = document.getElementById("buscar");
const btnBuscar = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");
const loader = document.getElementById("loader");

function buscarPeliculas(nombre) {
  loader.classList.remove("hidden");
  resultado.innerHTML = "";

  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${nombre}`)
    .then(response => response.json())
    .then(data => {
      loader.classList.add("hidden");
      if (data.Response === "True") {
        mostrarResultados(data.Search);
      } else {
        resultado.innerHTML = `
          <div class="alert warning">
            ⚠️ No se encontraron resultados para "<b>${nombre}</b>".
          </div>
        `;
      }
    })
    .catch(error => {
      loader.classList.add("hidden");
      resultado.innerHTML = `
        <div class="alert warning">
          ⚠️ Error al buscar: ${error.message}
        </div>
      `;
    });
}

function mostrarResultados(peliculas) {
  peliculas.forEach(peli => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${peli.Poster !== "N/A" ? peli.Poster : "https://via.placeholder.com/200x300?text=Sin+Imagen"}" alt="${peli.Title}">
      <h3>${peli.Title}</h3>
      <p>Año: ${peli.Year}</p>
    `;
    resultado.appendChild(card);
  });
}

btnBuscar.addEventListener("click", () => {
  const nombre = inputBuscar.value.trim();
  if (nombre) {
    buscarPeliculas(nombre);
  } else {
    resultado.innerHTML = `
      <div class="alert warning">
        ⚠️ Por favor, escribe un nombre antes de buscar.
      </div>
    `;
  }
});
