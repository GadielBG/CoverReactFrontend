cat > PROMPT.md << 'EOF'
# Contexto del proyecto COVER

# COVER — Contexto del Proyecto para Implementación

## Qué es COVER
Plataforma de reserva de mesas en bares y discotecas en Bolivia. Tres componentes:
- **App móvil (Flutter):** usuarios buscan locales, ven mesas en tiempo real, reservan y pagan
- **Web (React):** landing page informativa + formulario de registro para que los locales creen su perfil
- **Backend:** base de datos y login ya implementados

## Estado actual
- ✅ Base de datos implementada
- ✅ Login de usuario en Flutter implementado
- ✅ Diseño completo de todas las pantallas (Figma + mockups HTML)
- ⏳ **TAREA ACTUAL: Implementar la landing page web en React**

---

## TAREA: Landing Page React

Examina la estructura actual del proyecto React, luego implementa la landing page con las siguientes especificaciones.

### Dependencias sugeridas
- `framer-motion` o `aos` para animaciones scroll reveal
- Google Fonts: Outfit + DM Sans

### Paleta de colores (CSS variables)
```css
--bg-dark: #07070A;
--bg-section: #0C0C10;
--bg-card: #141418;
--bg-card-2: #1C1C22;
--bg-card-3: #25252D;
--neon-green: #D3FF00;
--neon-pink: #FF7BDA;
--neon-gradient: linear-gradient(135deg, #D3FF00 0%, #FF7BDA 100%);
--text-primary: #FFFFFF;
--text-secondary: #B8BDD0;
--text-muted: #6B7084;
--accent-blue: #4A90FF;
--accent-green: #00D68F;
--accent-red: #FF4D6A;
--accent-orange: #FF8A00;
```

### Tipografía
- **Headings:** Outfit (weights 300-900)
- **Body:** DM Sans (weights 400, 500, 700)

### Estilo general
- Dark premium, estética nocturna
- Bordes redondeados: 8px (sm), 12px (md), 20px (lg), 28px (xl), 50px (full)
- Cards con `border: 1px solid rgba(255,255,255,0.04)`
- Hover en cards: `translateY(-4px)` + borde verde neón sutil
- Scroll reveal animations en cada sección
- Responsive: desktop, tablet, mobile

---

## Secciones a implementar (componentes separados)

### 1. Navbar (`Navbar.jsx`)
- Logo "COVER" con gradiente (verde→rosa) en texto, font-weight 900, letter-spacing 3px
- Links: Cómo funciona, Para Locales, Testimonios
- Botón CTA: "Registrar mi Local" (gradiente, border-radius 50px)
- Scroll effect: fondo transparente → fondo blur oscuro al hacer scroll
- Mobile: menú hamburguesa

### 2. Hero (`Hero.jsx`)
- Fondo: 3 orbes difuminados (verde, rosa, azul) con animación floating lenta + grid overlay sutil
- Contenido izquierdo:
  - Badge: "● Disponible en La Paz, Bolivia" (fondo verde sutil, borde verde)
  - Título: "Reserva tu mesa." + line break + "Vive la noche." (segunda línea con gradiente)
  - Descripción: "COVER conecta a los amantes de la vida nocturna con los mejores bares y discotecas. Reserva tu mesa, paga desde la app y llega directo a disfrutar."
  - Botones: "Registrar mi Local" (gradiente) + "Descargar App" (outline)
  - Stats: "50+" locales, "2,400+" reservas, "4.8" rating
- Contenido derecho:
  - Mockup de teléfono con pantalla simulada de la app (perspectiva 3D sutil)
  - 2 tarjetas flotantes animadas: "Reservas hoy: +34 ↑18%" y "Mesa confirmada ✅ Mesa 4"

### 3. Cómo funciona (`HowItWorks.jsx`)
- Tag: "CÓMO FUNCIONA"
- Título: "Tu noche perfecta en 4 simples pasos"
- Línea de progreso horizontal conectando los pasos (gradiente verde→rosa)
- 4 cards verticales:
  1. 🔍 Explora — "Descubre bares y discotecas cerca de ti con fotos, menú, reseñas y disponibilidad en tiempo real."
  2. 🪑 Elige tu mesa — "Ve el mapa del local con las mesas disponibles. Elige la ubicación que más te guste: cerca del DJ, en la terraza o VIP."
  3. 💳 Paga fácil — "Paga con tarjeta, QR bancario o Tigo Money. Rápido, seguro y sin efectivo."
  4. 🎉 Disfruta — "Llega, muestra tu código QR y siéntate directo en tu mesa. Sin filas, sin esperas."
- Fondo de sección alternado (bg-section)

### 4. Beneficios para locales (`Benefits.jsx`)
- Tag: "PARA LOCALES"
- Título: "Haz crecer tu negocio con COVER"
- Grid 3 columnas (2 en tablet, 1 en mobile)
- 6 cards con hover effect (translateY + borde verde + línea gradiente top):
  1. 📈 Más visibilidad — métrica: "+40%" aumento en reservas
  2. 🪑 Gestión de mesas — métrica: "Tiempo real"
  3. 💰 Pagos seguros — métrica: "-65%" no-shows
  4. 📊 Analíticas — datos de clientes, horarios pico
  5. 💬 Chat directo — comunicación pre-visita
  6. 🔔 Promociones — ofertas y notificaciones push

### 5. Testimonios (`Testimonials.jsx`)
- Tag: "TESTIMONIOS"
- Título: "Lo que dicen nuestros aliados"
- Grid 3 columnas
- 3 cards con: 5 estrellas, texto de reseña (itálica), avatar con iniciales (gradiente), nombre y cargo
  1. Roberto Campos — Gerente · La Costilla Bar — "Desde que usamos COVER, nuestras reservas de viernes y sábado aumentaron un 45%..."
  2. Marcela López — Dueña · Forum Club — "El mapa de mesas en tiempo real es increíble..."
  3. Andrés Paredes — Admin · Hallwright's Pub — "Los pagos por QR nos cambiaron todo..."

### 6. Formulario de registro (`RegisterForm.jsx`)
Wizard de 4 pasos con:
- Layout: sidebar izquierdo (sticky) con título + beneficios del registro + formulario derecho
- Barra de progreso con 4 steps clickeables (estado: active/completed/pending)
- Navegación Atrás/Siguiente entre pasos

**Paso 1 — Información del local:**
- Nombre del local (text)
- Tipo de local (select: Bar, Discoteca, Pub, Lounge, Karaoke, Restaurante-Bar)
- Teléfono (tel, placeholder: +591 2 244 1234)
- Email del negocio (email)
- Descripción (textarea)
- Upload de fotos (drag & drop area, máx 5 fotos, JPG/PNG/WEBP, 5MB c/u)

**Paso 2 — Ubicación:**
- Dirección (text)
- Zona/Barrio (text)
- Ciudad (select: La Paz, Cochabamba, Santa Cruz, Sucre, Oruro, Tarija)
- Referencia (text)
- Mapa interactivo (placeholder para integrar Google Maps)

**Paso 3 — Configuración de mesas:**
- 3 tipos de mesa con contadores +/- cada uno:
  - Mesa redonda (2-4 personas)
  - Mesa rectangular (4-8 personas)
  - Mesa VIP (6-12 personas)
- Capacidad total del local (number)
- Total de mesas (calculado automáticamente, readonly)
- Zonas del local (text, separadas por comas)
- Upload de plano del local (opcional)

**Paso 4 — Horarios:**
- Grilla de 7 días (Lunes a Domingo)
- Cada día tiene: hora apertura (input), hora cierre (input), toggle on/off
- Viernes y Sábado resaltados en verde
- Domingo desactivado por defecto
- Precio mínimo por mesa (text, "Bs X")
- Precio mesa VIP (text, "Bs X")
- Botón final: "Enviar Registro ✓"

Sidebar izquierdo contiene:
- Tag: "ÚNETE A COVER"
- Título: "Registra tu local y llena tus mesas"
- Texto: "Completa el formulario y nuestro equipo verificará tu local en menos de 48 horas. Sin costo de registro."
- 4 beneficios con iconos: Sin costo de registro, Activación en 48h, Soporte dedicado, Panel web incluido

### 7. CTA Final (`CTASection.jsx`)
- Card centrada con glow verde sutil arriba
- Título: "¿Listo para llenar tus mesas cada fin de semana?"
- Descripción + botón "Registrar mi Local Gratis"

### 8. Footer (`Footer.jsx`)
- Logo COVER
- Descripción corta de la plataforma
- 3 columnas de links: Producto, Empresa, Legal
- Barra inferior: copyright "© 2026 COVER. Hecho en La Paz, Bolivia." + iconos de redes sociales

---

## Contexto boliviano importante
- Moneda: Bolivianos (Bs)
- Ciudades: La Paz (principal), Cochabamba, Santa Cruz, Sucre, Oruro, Tarija
- Métodos de pago locales: QR bancario (Banco Unión, Mercantil, BNB, Económico, BISA), Tigo Money
- Teléfonos formato: +591 X XXX XXXX

---

## Recursos de referencia
- Figma original: https://www.figma.com/design/sdqzKiOUMsAl78pkmgPqFP/App-movil
- Los mockups HTML detallados están disponibles como referencia visual adicional

## Instrucciones de implementación
1. Examina primero la estructura actual del proyecto React
2. Crea cada sección como componente separado
3. Usa CSS Modules o styled-components según lo que ya tenga el proyecto
4. Implementa responsive design (mobile-first)
5. Agrega scroll reveal animations
6. El formulario debe manejar estado con useState (wizard multi-step)
7. Todos los textos en español