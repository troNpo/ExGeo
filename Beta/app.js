function convertir() {
  const input = document.getElementById('mapsUrl').value.trim();

  // Detectar enlaces acortados de Google Maps
  if (/^(https?:\/\/)?(goo\.gl|maps\.app\.goo\.gl)\//.test(input)) {
    window.open(input, '_blank'); // Abrir en nueva pestaña

    // Mostrar mensaje en la interfaz
    const aviso = document.createElement('div');
    aviso.className = 'aviso';
    aviso.innerHTML = `
      <p>🔗 Este es un enlace acortado. Ábrelo en la nueva pestaña y copia la URL completa con coordenadas.</p>
      <button onclick="copiarTexto('${input}')">Copiar enlace original</button>
    `;
    document.querySelector('.container').appendChild(aviso);
    return;
  }

  const patterns = [
    /@([-.\d]+),([-.\d]+)/,                            // Google Maps con @lat,lon
    /q=([-.\d]+),([-.\d]+)/,                           // Google Maps con q=lat,lon
    /^geo:\s*([-.\d]+)\s*,\s*([-.\d]+)(?:,[-.\d]+)?$/, // geo:lat,lon con o sin espacios
    /^([-.\d]+)[,\s]+([-.\d]+)$/                       // lat lon separados por coma o espacio
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) {
      return abrirEnOrux(match[1], match[2]);
    }
  }

  alert("Entrada no válida. Introduce coordenadas o un enlace de Google Maps o geo:");
}

function abrirEnOrux(lat, lon) {
  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);

  if (isNaN(latNum) || isNaN(lonNum)) {
    alert("Coordenadas no válidas.");
    return;
  }

  if (latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
    alert("Coordenadas fuera de rango.");
    return;
  }

  const oruxUrl = `https://oruxmaps.com/position?q=${latNum},${lonNum}`;
  window.location.href = oruxUrl;
}

function copiarTexto(texto) {
  navigator.clipboard.writeText(texto).then(() => {
    alert("Enlace copiado al portapapeles.");
  });
}
