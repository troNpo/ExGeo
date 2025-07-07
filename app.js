function convertir() {
  const input = document.getElementById('mapsUrl').value.trim();

  // Elimina todos los espacios para facilitar el análisis
  const cleaned = input.replace(/\s+/g, '');

  const patterns = [
    /@([-.\d]+),([-.\d]+)/,                      // Google Maps con @lat,lon
    /q=([-.\d]+),([-.\d]+)/,                     // Google Maps con q=lat,lon
    /^geo:([-.\d]+),([-.\d]+)(?:,[-.\d]+)?$/,    // geo:lat,lon
    /^([-.\d]+)[,\s]+([-.\d]+)$/                 // lat lon separados por coma o espacio
  ];

  for (const pattern of patterns) {
    const match = cleaned.match(pattern);
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
