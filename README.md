# Landing inmobiliaria de E Beats Perú

Sitio estático en HTML, CSS y JavaScript. No necesita un proceso de compilación.

## Vista local

Desde la raíz del repositorio, inicia un servidor y abre `http://localhost:3000`.

```bash
python -m http.server 3000 --bind 127.0.0.1
```

## Editar la oferta

- En `config.js` están la marca, el WhatsApp comercial con código de país, los mensajes prellenados, el enlace de reservas, el Pixel, los textos principales y los alcances. La propuesta y sus tarifas se comparten por separado.
- Con `bookingUrl` vacío, la solicitud de cita se coordina por WhatsApp. Para añadir reserva directa al resultado del quiz, ingresa el enlace a un evento gratuito de la duración indicada en `offer.bookingMinutes`.
- Para la demo, configura `whatsapp.demoNumber` solo si existe un número separado. Con el campo vacío, el enlace usa el número comercial y el mensaje solicita una prueba.
- Si tienes una presentación aprobada para descarga pública, coloca una versión sin tarifas en `assets/` y configura su ruta en `proposalUrl`. Con el campo vacío, el bloque de descarga queda oculto.
- Los colores están al inicio de `assets/inmobiliarias/landing.css`. El video de apoyo y los subtítulos tienen rutas independientes en `config.js`. Si retiras el video, deja `supportVideoUrl` vacío.

## Quiz de diagnóstico

El quiz pregunta por el rol, el catálogo activo, las consultas semanales por WhatsApp, la necesidad principal y el plazo. La lógica en `assets/inmobiliarias/landing.js` prepara tres tipos de diagnóstico.

- **Evaluación de implementación.** Tiene una operación inmobiliaria activa, quiere empezar este mes y gestiona al menos seis propiedades o recibe al menos once consultas semanales.
- **Revisión de proceso.** Tiene una operación inmobiliaria activa y puede beneficiarse de revisar qué conviene automatizar primero.
- **Exploración.** Todavía arma su catálogo, está evaluando opciones o viene de otro rubro.

Cada perfil puede solicitar el diagnóstico. Las respuestas viven en memoria mientras la página esté abierta. WhatsApp abre un mensaje editable con el perfil, las cinco respuestas y los parámetros UTM de la sesión, si los hay.

## Material visual por ubicación

Las tres capturas entregadas se muestran como ejemplos ilustrativos. Las versiones WebP residen en `assets/inmobiliarias/`. Para reemplazarlas, usa contactos y propiedades de un entorno de prueba y mantén los datos de clientes fuera de las capturas.

| Estado | Ubicación | Archivo y contenido |
| --- | --- | --- |
| Integrado | Mockup junto al titular | `asistente-whatsapp-{360,720}.webp`. Conversación vertical con una pregunta de calificación y dos horarios de visita. |
| Integrado | Debajo de «Bandeja de asesores en Chatwoot» | `bandeja-inmobiliaria-{768,1536}.webp`. Bandeja horizontal con una conversación abierta, etiquetas y una visita agendada. El enlace permite abrir la versión grande. |
| Integrado | Debajo de «Agenda y seguimiento con n8n» | `agenda-recordatorio-{768,1536}.webp`. Cita confirmada junto al recordatorio recibido por WhatsApp. El enlace permite abrir la versión grande. |
| Opcional | Dentro del ejemplo de propiedad | `propiedad-demo.webp`, **1600 × 1000 px**. Una foto autorizada de sala o fachada, con buen encuadre y sin carteles, personas identificables, marcas de agua ni direcciones. Se usa dentro del mockup o del chat. |
| Opcional | Video debajo de la demo | `demo-inmobiliaria.mp4`, **1920 × 1080 px**, de **45 a 90 segundos**. Graba una consulta, su calificación, la reserva y su aparición en Chatwoot o calendario. Incluye `demo-inmobiliaria.es.vtt` y una portada `demo-portada.webp` de **1280 × 720 px**. |

El encabezado, el pie y el favicon ya usan los logos originales. Si tienes archivos maestros, puedes entregar el logo negro y rojo y el logo blanco en SVG con fondo transparente. La portada para compartir ya existe en **1200 × 630 px**. Los íconos de interfaz están en `assets/inmobiliarias/icons.svg` e incluyen WhatsApp, reloj, conversación, personas, edificio, flujo, catálogo, reporte, calendario, verificación y navegación.

## Meta Pixel

Escribe el ID numérico en `metaPixelId` para activar `ViewContent` al abrir la landing, `Contact` al pulsar un enlace a WhatsApp y `Lead` al pulsar una opción de contacto desde el resultado del quiz. `Lead` representa la intención de contactar desde el resultado. Completa el aviso de privacidad y comprueba los eventos en **Probar eventos** de Meta cuando lo actives.

## Desplegar en un VPS con HTTPS

Apunta el DNS del dominio al VPS y abre los puertos 80 y 443. El repositorio usa `xn--ebeatsper-e9a.tech`, la forma ASCII de `ebeatsperú.tech`. Si usas otro dominio, actualiza los canónicos, Open Graph, `sitemap.xml`, `robots.txt` y `llms.txt`.

En el VPS, desde el repositorio, copia los archivos públicos a la raíz del sitio.

```bash
sudo mkdir -p /var/www/ebeats
sudo rsync -a \
  index.html config.js robots.txt sitemap.xml llms.txt favicon.ico \
  google0fba4ef6d49804d8.html assets pages /var/www/ebeats/
```

El `Dockerfile` copia los archivos de una versión limpia. Si actualizas un sitio existente mediante `rsync`, usa un directorio de publicación nuevo para retirar también los archivos de la versión anterior. Nginx, Caddy y Netlify aplican las redirecciones de las URLs antiguas.

### Nginx

1. Copia `nginx.conf` a `/etc/nginx/conf.d/ebeats.conf`. Cambia `server_name _` por tu dominio y `root /usr/share/nginx/html` por `root /var/www/ebeats`.
2. Ejecuta `sudo nginx -t` y después `sudo systemctl reload nginx`.
3. Con Certbot y el complemento de Nginx instalados, ejecuta `sudo certbot --nginx --redirect -d xn--ebeatsper-e9a.tech`. Comprueba la renovación con `sudo certbot renew --dry-run`.
4. Si lo sirves mediante el `Dockerfile` del repositorio, el contenedor escucha HTTP en el puerto 80. Termina HTTPS en el proxy del VPS y dirige el tráfico al contenedor.

### Caddy

Copia `Caddyfile.example` a `/etc/caddy/Caddyfile` y ajusta el dominio y la raíz. Ejecuta `sudo caddy validate --config /etc/caddy/Caddyfile` y `sudo systemctl reload caddy`. Con el dominio y los puertos disponibles, Caddy provisiona y renueva HTTPS automáticamente.

[HTTPS automático de Caddy](https://caddyserver.com/docs/automatic-https)

## Pendientes antes de publicar

- Completar la identificación legal del prestador, la información del tratamiento de datos y la revisión de los textos legales.
- Si se van a usar, configurar la reserva directa, el WhatsApp de demo y el ID de Meta Pixel.
- Incorporar testimonios, métricas verificables o proyectos cuando haya autorización expresa. Los puntos de inserción están marcados como `TODO` en `index.html`.
