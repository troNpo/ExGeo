let ultimaLat = null;
let ultimaLon = null;
let historial = [];

const historialGuardado = localStorage.getItem('historialExGeo');
if (historialGuardado) {
  try {
    historial = JSON.parse(historialGuardado);
  } catch (e) {
    console.error("Error al cargar historial:", e);
    historial = [];
  }
}
function convertir() {
  const input = document.getElementById('mapsUrl').value.trim();

  // Eliminar avisos anteriores (excepto el tutorial)
  document.querySelectorAll('.aviso').forEach(el => {
    if (el.id !== 'tutorialExGeo') el.remove();
  });

  // Ocultar el tutorial si está abierto
  const tutorial = document.getElementById('tutorialExGeo');
  if (tutorial.style.display === 'block') {
    tutorial.style.display = 'none';
  }

  // Detectar enlaces acortados
  if (/^(https?:\/\/)?(goo\.gl|maps\.app\.goo\.gl)\//.test(input)) {
  const aviso = document.createElement('div');
  aviso.className = 'aviso';
  aviso.innerHTML = `
    <div class="aviso-cabecera">
      <strong>Enlace acortado detectado</strong>
      <button class="cerrar-aviso" onclick="cerrarAviso(this)">✖</button>
    </div>
    <p>📱 Este es un enlace acortado de Google Maps. Al abrirlo desde el móvil, se abrirá directamente en la app de Google Maps y <strong>no podrás copiar la URL completa</strong>.</p>
    <p><strong>¿Cómo copiar coordenadas desde Google Maps?</strong></p>
    <ol>
      <li>Abre el enlace en la app de Google Maps</li>
      <li>Mantén pulsado sobre el punto del mapa</li>
      <li>Verás un pin rojo con las coordenadas arriba</li>
      <li>Toca las coordenadas para copiarlas</li>
      <li>Vuelve a ExGeo y pégalas aquí</li>
    </ol>
    <div class="botones-aviso">
      <button onclick="window.open('${input}', '_blank')">Abrir en Google Maps</button>
      <button onclick="enfocarCampo()">Pegar coordenadas</button>
    </div>
  `;
  document.querySelector('.container').appendChild(aviso);
  return;
}

  // Patrones para extraer coordenadas
  const patterns = [
    /@([-.\d]+),([-.\d]+)/,
    /q=([-.\d]+),([-.\d]+)/,
    /^geo:\s*([-.\d]+)\s*,\s*([-.\d]+)(?:,[-.\d]+)?$/,
    /^([-.\d]+)[,\s]+([-.\d]+)$/
  ];

  for (const pattern of patterns) {
  const match = input.match(pattern);
  if (match) {
    const lat = parseFloat(match[1]);
    const lon = parseFloat(match[2]);

    if (isNaN(lat) || isNaN(lon)) {
      alert("Coordenadas no válidas.");
      return;
    }

    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      alert("Coordenadas fuera de rango.");
      return;
    }

   // Guardar coordenadas automáticamente
ultimaLat = lat;
ultimaLon = lon;

// Mostrar aviso de éxito
const aviso = document.createElement('div');
aviso.className = 'aviso';
aviso.innerHTML = `
  <div class="aviso-cabecera">
    <strong>Coordenadas detectadas</strong>
    <button class="cerrar-aviso" onclick="cerrarAviso(this)">✖</button>
  </div>
  <p>Coordenadas detectadas:</p>
  <ul>
    <li><strong>Latitud:</strong> ${lat}</li>
    <li><strong>Longitud:</strong> ${lon}</li>
  </ul>
  <div class="botones-aviso">
    <button onclick="guardarCoordenadas(${lat}, ${lon})" class="icon-button">
      <img src="./icons/historial.png" alt="Guardar coordenadas" /> Validar y guardar
    </button>
    <button onclick="abrirEnOrux(${lat}, ${lon})" class="icon-button">
      <img src="./icons/orux.png" alt="Abrir en OruxMaps" /> Abrir en OruxMaps
    </button>
  </div>
`;
document.querySelector('.container').appendChild(aviso);
return;
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

  // Guardar coordenadas para exportar
  ultimaLat = latNum;
  ultimaLon = lonNum;

  const oruxUrl = `https://oruxmaps.com/position?q=${latNum},${lonNum}`;
  window.location.href = oruxUrl;
}

function enfocarCampo() {
  document.getElementById('mapsUrl').focus();
}
function mostrarTutorial() {
  const tutorial = document.getElementById('tutorialExGeo');

  // Alternar visibilidad del tutorial
  if (tutorial.style.display === 'none' || tutorial.style.display === '') {
    tutorial.style.display = 'block';
  } else {
    tutorial.style.display = 'none';
  }

  // Cerrar el menú lateral si está abierto
  menuLateral.classList.remove('visible');
}

// Menú lateral
const menuLateral = document.getElementById('menuLateral');
const menuBtn = document.querySelector('.menu-button');

function toggleMenu() {
  menuLateral.classList.toggle('visible');
}

document.addEventListener('click', (e) => {
  if (!menuLateral.contains(e.target) && !menuBtn.contains(e.target)) {
    menuLateral.classList.remove('visible');
  }
});
function descargarGPX() {
  if (ultimaLat === null || ultimaLon === null) {
    alert("Primero convierte unas coordenadas para poder exportarlas.");
    return;
  }

  const nombre = prompt("Introduce un nombre para el archivo GPX:", "ubicacion_exgeo");
  if (!nombre) return;

  const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="ExGeo" xmlns="http://www.topografix.com/GPX/1/1">
  <wpt lat="${ultimaLat}" lon="${ultimaLon}">
    <name>${nombre}</name>
  </wpt>
</gpx>`;

  const blob = new Blob([gpxContent], { type: "application/gpx+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${nombre}.gpx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  // Guardar en historial
historial.push({
  nombre,
  lat: ultimaLat,
  lon: ultimaLon
});
localStorage.setItem('historialExGeo', JSON.stringify(historial));
}

function cerrarAviso(boton) {
  const aviso = boton.closest('.aviso');
  if (aviso) {
    aviso.remove();
  }
}
function validarEntrada() {
  const input = document.getElementById('mapsUrl').value.trim();

  const patterns = [
    /@([-.\d]+),([-.\d]+)/,
    /q=([-.\d]+),([-.\d]+)/,
    /^geo:\s*([-.\d]+)\s*,\s*([-.\d]+)(?:,[-.\d]+)?$/,
    /^([-.\d]+)[,\s]+([-.\d]+)$/
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) {
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[2]);

      if (isNaN(lat) || isNaN(lon)) {
        alert("Coordenadas no válidas.");
        return;
      }

      if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        alert("Coordenadas fuera de rango.");
        return;
      }

      ultimaLat = lat;
      ultimaLon = lon;

      alert(`Coordenadas guardadas:\nLatitud: ${lat}\nLongitud: ${lon}`);
      return;
    }
  }

  alert("No se detectaron coordenadas válidas.");
}
function mostrarHistorial() {
  const lista = document.getElementById('listaHistorial');
  lista.innerHTML = '';

  if (historial.length === 0) {
    lista.innerHTML = '<li>No hay ubicaciones guardadas aún.</li>';
  } else {
    historial.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${item.nombre}</strong><br/>
        Lat: ${item.lat}, Lon: ${item.lon}<br/>
        <button onclick="descargarDesdeHistorial(${index})">⬇️ GPX</button>
        <button onclick="abrirEnOrux(${item.lat}, ${item.lon})">📍 Orux</button>
      `;
      lista.appendChild(li);
    });
  }

  document.getElementById('panelHistorial').style.display = 'block';
}
function cerrarHistorial() {
  document.getElementById('panelHistorial').style.display = 'none';
}
function borrarHistorial() {
  if (confirm("¿Seguro que quieres borrar todo el historial?")) {
    historial = [];
    localStorage.removeItem('historialExGeo');
    mostrarHistorial();
  }
}