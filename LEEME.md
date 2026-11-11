# Máscara contra Máscara — guía para publicar

Esta carpeta trae todo lo necesario para:
1. Jugarlo como **app instalada en tu iPhone** (sin internet).
2. Convertirlo en **app de Android y iPhone** para las tiendas.
3. Hacer **pruebas con gente real** (y cumplir el requisito de Google Play).

```
mcm-app/
├── www/                  ← el juego (esto es lo que se sube a Netlify)
│   ├── index.html        ← el juego completo
│   ├── manifest.json     ← permite "Agregar a inicio" como app
│   ├── sw.js             ← lo hace funcionar sin internet
│   ├── icon-*.png        ← íconos
│   └── privacidad.html   ← política de privacidad (la piden las tiendas)
├── netlify.toml          ← le dice a Netlify que publique la carpeta www
├── package.json          ← para Capacitor (apps de tienda)
├── capacitor.config.json
└── LEEME.md              ← esta guía
```

---

## Paso 1 — Subirlo a internet (Netlify, gratis)

Te recomiendo un **repositorio nuevo** (no dentro de VetQuiz), para que la app quede en su propia dirección.

1. En GitHub crea un repositorio nuevo, por ejemplo `mascara-contra-mascara`.
2. Sube **todo el contenido de esta carpeta** (`www/`, `netlify.toml`, etc.). En GitHub web: *Add file → Upload files* y arrastra todo.
3. En Netlify: *Add new site → Import an existing project → GitHub* → elige el repositorio.
   - Netlify lee `netlify.toml` y publica la carpeta `www` solo.
4. Te dará una dirección tipo `https://algo.netlify.app`. Puedes cambiarla en *Site configuration → Change site name* (por ejemplo `mascaracontramascara.netlify.app`).

**Cada vez que actualices el juego:** reemplaza `www/index.html` y en `www/sw.js` sube el número de versión (por ejemplo de `mcm-v14` a `mcm-v15`). Eso hace que los celulares descarguen la versión nueva.

## Paso 2 — Instalarlo en tu iPhone como app

1. Abre tu dirección de Netlify en **Safari** (tiene que ser Safari).
2. Toca el botón **Compartir** (cuadro con flecha ↑).
3. Elige **"Agregar a pantalla de inicio"** → **Agregar**.
4. Aparece el ícono de la máscara. Ábrelo desde ahí: se ve a pantalla completa y funciona **sin internet** después de la primera vez.

> Tu progreso se guarda en el celular. Usa **Opciones → Respaldo de partida** para copiar un código y no perder nada si cambias de celular.

---

## Paso 3 — Hacer la app para las tiendas (Capacitor)

Capacitor mete tu juego web dentro de una app real de Android/iPhone.

**Lo que necesitas:**
- Una computadora con [Node.js](https://nodejs.org) (versión LTS).
- **Android:** [Android Studio](https://developer.android.com/studio) (Windows, Mac o Linux).
- **iPhone:** una **Mac** con Xcode. Sin Mac no se puede compilar para iPhone (alternativa: servicios en la nube como Codemagic o Ionic Appflow).

**Comandos (en la terminal, dentro de esta carpeta):**
```bash
npm install
npx cap add android        # solo la primera vez
npx cap add ios            # solo la primera vez (en Mac)
npm run android            # abre el proyecto en Android Studio
npm run ios                # abre el proyecto en Xcode (Mac)
```

**En Android Studio:** *Build → Generate Signed App Bundle* → crea tu llave (¡guárdala bien, sin ella no puedes actualizar la app!) → obtienes un archivo `.aab` para subir a Google Play.

**Antes de enviar**, cambia en `capacitor.config.json` el `appId` si quieres otro (formato `com.tunombre.juego`; no se puede cambiar después de publicar).

## Paso 4 — Cuentas de desarrollador

| Tienda | Costo | Notas |
|---|---|---|
| Google Play | $25 USD una sola vez | Cuentas personales nuevas: prueba cerrada con **12 personas durante 14 días seguidos** antes de publicar (ver Paso 6). |
| App Store (Apple) | $99 USD al año | Necesitas Mac para compilar. La revisión suele tardar 1–3 días. |

**Recomendación:** empieza por Google Play (más barato), y cuando tenga descargas, pasa a iPhone.

## Paso 5 — Anuncios (AdMob)

El juego ya tiene lugares preparados para **anuncios con recompensa** (sobre gratis, revivir con 50% de vida). Para cobrar:
1. Crea una cuenta en [AdMob](https://admob.google.com) y una app ahí.
2. Instala el plugin: `npm install @capacitor-community/admob` y `npx cap sync`.
3. Cambia la función `ad(cb)` del juego para que muestre el anuncio real y llame a `cb()` cuando el jugador lo termine. (Pídemelo cuando llegues a este paso y te lo dejo listo con tus IDs.)

Los anuncios con recompensa (el jugador decide verlos) son los que mejor pagan y los que menos molestan.

**Política de privacidad:** ya está en `www/privacidad.html`. Antes de publicar, **abre el archivo y pon tu correo de contacto** donde dice `[ESCRIBE AQUÍ TU CORREO DE CONTACTO]`. En las tiendas pegas la dirección: `https://TU-SITIO.netlify.app/privacidad.html`.

### Texto para la ficha de la tienda

**Nombre:** Máscara contra Máscara: Lucha Libre

**Descripción corta (80 caracteres):**
Lucha libre + cartas: sube del patio al estadio y defiende tu máscara.

**Descripción larga:**
¡Ponte la máscara y sube al ring! Máscara contra Máscara es un juego de cartas y estrategia de lucha libre mexicana.

🏚️ Empieza en una lona parchada en el patio de una vecindad y sube de categoría: la kermés del pueblo, la arena del barrio, la Coliseo, la Arena Nacional, una gira por Texas... hasta el Estadio Mundial.
🃏 Arma tu mazo con llaves, vuelos, rudezas y remates. Abre sobres y colecciona cartas comunes, raras y legendarias.
🎭 Elige tu estilo: técnico, rudo, gigante, volador, exótico o mini. Ponle tu nombre y diseña tu propia máscara.
📰 Fuera del ring también pasan cosas: te detiene una patrulla, te pagan con pollos, te ofrecen salir en una película... tus decisiones cuentan.
🤝 Haz amigos o enemigos: tu rival Kid Veneno, tu mamá y tu promotor cambian según lo que decidas. ¡6 finales distintos!
😈 Haz trampa... si el réferi no te ve.
🏆 Gana la Máscara contra Máscara y conviértete en leyenda.

Funciona sin internet.

---

## Paso 6 — Pruebas con gente real (y los 12 probadores de Google)

Google Play pide que las cuentas personales nuevas hagan una **prueba cerrada con al menos 12 personas durante 14 días seguidos** antes de publicar. Aprovecha eso para mejorar el juego:

1. En Play Console crea un canal de **Prueba cerrada** y agrega los correos (Gmail) de 12–15 amigos (invita de más por si alguien se sale).
2. Pídeles que lo jueguen **al menos 3 veces en esas dos semanas**, no solo instalarlo.
3. Las primeras 5 personas: mírales jugar **sin explicarles nada** (en persona o videollamada) y apunta:
   - ¿Dónde se quedaron atorados o confundidos?
   - ¿En qué momento dejaron de jugar?
   - ¿Qué les dio risa? ¿Qué los emocionó?
   - ¿Entendieron cómo funcionan la energía, la afición y el réferi?
4. Al final, pregúntales:
   - Del 1 al 10, ¿qué tanto lo recomendarías?
   - ¿Qué fue lo mejor y lo peor?
   - ¿Pagarías por quitar anuncios? ¿Cuánto?
   - ¿Lo volviste a abrir al día siguiente sin que te lo pidiera?
5. Corrige lo que se repita en 3 o más personas antes de publicar.

---

## Lista rápida antes de publicar

- [ ] Juego subido a Netlify y probado en iPhone y Android.
- [ ] Correo puesto en `privacidad.html`.
- [ ] `appId` definitivo en `capacitor.config.json`.
- [ ] Cuenta de Google Play ($25) creada.
- [ ] Prueba cerrada con 12+ personas por 14 días.
- [ ] Capturas de pantalla (mínimo 2) y el ícono de 512×512 (`www/icon-512.png`).
- [ ] AdMob conectado (opcional para la primera versión).
