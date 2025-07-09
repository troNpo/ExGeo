# 📓 ExGeo – Registro de Cambios

ExGeo es una herramienta web diseñada para dispositivos móviles que permite convertir enlaces de Google Maps o coordenadas en enlaces compatibles con OruxMaps. Su objetivo es facilitar el envío rápido de ubicaciones desde el navegador móvil a la app de navegación.

---

## 🧭 Funcionalidades principales desde el inicio

- Acepta coordenadas en formato `lat,lon`
- Acepta enlaces de Google Maps con coordenadas (`q=lat,lon`, `@lat,lon`)
- Convierte automáticamente la ubicación a un enlace de OruxMaps
- Redirige al usuario a la app OruxMaps con la posición indicada
- Interfaz optimizada para móviles, sin necesidad de instalación

---
## 📅 Versión 1.3 – Julio 2025

### ✨ Novedades
- 🕘 **Historial de ubicaciones**: ahora puedes guardar las coordenadas exportadas como GPX con nombre personalizado.
- 📂 **Descarga desde historial**: vuelve a descargar cualquier ubicación anterior en formato GPX.
- 📍 **Abrir en OruxMaps** desde el historial con un solo clic.
- 🗑️ **Borrar historial**: botón dentro del panel de historial para eliminar todas las ubicaciones guardadas.
- 💾 **Historial persistente**: las ubicaciones se guardan en `localStorage` y permanecen aunque cierres la app.

### 🧰 Mejoras
- 🎯 Centrado del campo de entrada de coordenadas.
- 🧹 Eliminada opción de exportar en KML para simplificar la interfaz.
- 📘 Tutorial actualizado con las nuevas funciones y formato más claro.

### 🐞 Correcciones
- Se corrigió el desplazamiento del input hacia la derecha.
- Se mejoró la detección de enlaces acortados de Google Maps.

---


## [1.0.0] – 2025-07-07
### Añadido
- Detección de enlaces acortados de Google Maps (`maps.app.goo.gl`)
- Mensaje explicativo con pasos para copiar coordenadas desde la app
- Botón para abrir el enlace y otro para volver a pegar coordenadas
- Botón ℹ️ para mostrar tutorial general de uso
- Placeholder en el campo de entrada con ejemplo de enlace válido

### Mejorado
- El mensaje de tutorial se oculta automáticamente si aparece el aviso de enlace acortado
- Diseño adaptado completamente a móvil
- Fondo azul degradado restaurado (original `#1e3c72 → #2a5298`)

---

## [0.9.0] – 2025-07-06
### Añadido
- Soporte para enlaces con coordenadas (`q=lat,lon`, `@lat,lon`)
- Soporte para coordenadas directas (`lat, lon`)
- Conversión automática a enlace de OruxMaps

---

## [0.8.0] – 2025-07-05
### Inicial
- Interfaz básica con campo de entrada y botón de conversión
- Redirección a OruxMaps con coordenadas manuales