function convertir() {
  const input = document.getElementById('mapsUrl').value.trim();

  const match = input.match(/@([-.\d]+),([-.\d]+)/) ||
                input.match(/q=([-.\d]+),([-.\d]+)/) ||
                input.match(/^geo:([-.\d]+),([-.\d]+)(?:,[-.\d]+)?$/) ||
                input.match(/^([-.\d]+)[,\s]+([-.\d]+)$/);

  if (match) {
    abrirEnOrux(match[1], match[2]);
  } else {
    alert("Entrada no válida. Introduce un enlace con coordenadas o escríbelas directamente.");
  }
}

function abrirEnOrux(lat, lon) {
  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);

  if (latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
    alert("Coordenadas fuera de rango.");
    return;
  }

  const oruxUrl = `https://oruxmaps.com/position?q=${latNum},${lonNum}`;
  window.location.href = oruxUrl;
}
