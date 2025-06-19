# 📚 Conversaciones con la Historia

**Una plataforma educativa liberadora para dialogar con personajes históricos, construir memoria crítica y transformar la escuela desde el pensamiento y la tecnología ética.**

---

## 🎯 ¿Qué es “Conversaciones con la Historia”?

“Conversaciones con la Historia” es una aplicación de escritorio que permite a estudiantes y docentes interactuar —a través de chat motivante y accesible— con personajes históricos y científicos simulados mediante Inteligencia Artificial, en un entorno seguro, 100% offline y completamente soberano.

Diseñada para promover el aprendizaje dialógico, la memoria histórica, la reflexión y la dignidad educativa, integra herramientas avanzadas para docentes, curadores y familias, manteniendo la privacidad y el control total de los datos en la escuela.

---

## 🌟 **Principios Fundamentales**

- **Pedagogía crítica y liberadora:** Inspirada en Paulo Freire, Henry Giroux y Gabriela Mistral. El estudiante es sujeto, no objeto; el error es oportunidad, la voz propia es digna.
- **Accesibilidad e inclusión:** Experiencia amigable para todas las neurodivergencias, con opciones de personalización visual y sensorial.
- **Privacidad y soberanía tecnológica:** Ningún dato sale del computador local; no hay dependencia de servicios externos ni nube.
- **Pensamiento crítico y memoria viva:** Promueve la investigación, el diálogo y la reflexión ética sobre la historia y la ciencia.

---

## 🧩 **Módulos y Funcionalidades Principales**

### **1. Panel Estudiante**
- **Chat IA histórico:** Conversa con figuras históricas reales, con respuestas fundamentadas, fuentes visibles y feedback positivo.
- **Desafíos y misiones:** Actividades motivantes y colaborativas, autoevaluación por emociones y logros, feedback automático y humano.
- **Portafolio personal:** Histórico de reflexiones, desafíos, logros, insignias y retroalimentación docente.
- **Mensajería interna:** Envía dudas, comentarios y sugerencias a tu docente de manera confidencial.
- **Accesibilidad avanzada:** Modo oscuro, tamaño de letra ajustable, ayudas visuales, ritmo propio.

### **2. Panel Docente**
- **Panel de administración y curado:**  
  - Gestión avanzada de personajes, prompts, recursos (textos, citas, imágenes, PDFs) y colecciones por época, tema o ideología.
  - Trazabilidad y logs de cambios.
  - Exportar a Excel y duplicar personajes para rápida iteración.
  - Validación de fuentes y fragmentos para garantizar rigor histórico y ético.
- **Analítica y seguimiento:**  
  - Visualización de participación, emociones y progresos por grupo/estudiante.
  - Comparativas grupales y temporales (nunca punitivas).
  - Envío de desafíos personalizados y mensajes a estudiantes.
- **Resúmenes familiares/docentes:**  
  - Informes listos para impresión o envío, siempre motivantes y orientados al acompañamiento.
- **Mensajería interna:**  
  - Recepción y respuesta a mensajes confidenciales de estudiantes.

### **3. Panel Curador**
- **Control absoluto de personajes y fragmentos:**  
  - Creación, edición, revisión colaborativa y workflows de aprobación.
  - Revisión de anacronismos, sesgos y métricas de calidad.
- **Capacitación y documentación integrada** para formar equipos curatoriales.

### **4. Sincronización y Seguridad**
- **App 100% offline:** Funciona sin conexión a internet en hardware estándar o limitado.
- **Backup automático al salir:**  
  - Se respalda la base de datos y archivos clave en cada cierre, conservando los 7 respaldos más recientes.
  - Opciones manuales de backup y restore (USB o carpeta local).
  - Limpieza automática de respaldos antiguos.
- **Logs para soporte y restauración segura**.

### **5. IA Local Integrada**
- **Motor Llama 3 (u otro compatible, vía Ollama):**  
  - Todas las respuestas se procesan localmente, sin exponer datos sensibles.
  - Prompt “alma” personalizado para cada personaje y base documental curada.

---

## 💻 **Requisitos de Hardware y Software**

- **Sistema Operativo:** Windows 10/11 o Linux (Ubuntu, Debian, Fedora, etc.)
- **Hardware mínimo:** PC estándar con 2GB RAM y 2 núcleos de CPU (recomendado: 4GB+)
- **Espacio en disco:** 1GB libre (más si usas muchos archivos multimedia)
- **Permisos de instalación de programas**
- **No requiere internet** salvo para descargas iniciales

---

## ⚙️ **Instalación — Paso a Paso**

### **Para usuarios finales (profesores/escuelas):**

#### **1. Descarga la app y el motor IA**

- Descarga el instalador de la app desde [enlace oficial] o pide el archivo a tu equipo técnico.
- Descarga e instala [Ollama](https://ollama.com/download) (motor IA local).
    - Después de instalar Ollama, abre una terminal y ejecuta:
      ```
      ollama pull llama3
      ```
    - Espera a que finalice la descarga del modelo.

#### **2. Instala la app de escritorio**

- Ejecuta el archivo `.exe` (Windows) o `.deb`/`.AppImage` (Linux).
- Sigue el asistente: permite crear acceso directo y elige la carpeta de instalación recomendada.
- Inicia la app desde el menú o el acceso directo del escritorio.

#### **3. Primer inicio**

- La aplicación se abrirá y el backend arrancará automáticamente.
- Si es la primera vez, verás un mensaje de bienvenida.
- El sistema estará listo para crear usuarios, personajes y comenzar a dialogar.

---

### **Para técnicos y administradores (instalación avanzada/desarrollo):**

#### **1. Clona el repositorio y configura dependencias**

```bash
git clone https://github.com/nucleoludico/conversaciones-historia.git
cd conversaciones-historia
npm install
2. Instalación de dependencias internas
bash
Copiar
Editar
cd backend && npm install
cd ../frontend && npm install
cd ../electron && npm install
3. Construcción y empaquetado
bash
Copiar
Editar
npm run build:frontend
npm run package:win     # Para Windows
npm run package:linux   # Para Linux
4. Configuración IA local
Instala y configura Ollama y el modelo llama3 como en la guía para usuarios finales.

Backup y restauración
Backup automático
Cada vez que cierras la app, se genera automáticamente un backup en
~/Documentos/backups_historia_auto/

Se conservan los 7 últimos backups; los más antiguos se borran automáticamente.

Backup manual
Desde el Panel Docente, accede a “Backup y Restaurar”.

Puedes guardar un backup en una carpeta o USB externa.

Restaurar
Desde el Panel Docente, elige “Restaurar Backup”.

Selecciona la carpeta con el backup deseado.
¡Importante! Haz esto solo si necesitas recuperar información y asegúrate de que nadie esté usando la app.

🛡️ Privacidad y ética
Todos los datos quedan en el computador local.

No se recolecta ni comparte información con terceros.

Los logs y respaldos son accesibles solo para el usuario y el soporte técnico autorizado.

📝 Documentación y soporte
Manuales de uso, videos tutoriales y guía rápida incluidos en la app y en la carpeta /docs.

Soporte técnico: escribe a [soporte@nucleoludico.cl] o revisa la sección de preguntas frecuentes.

Comunidad de práctica: comparte tu experiencia en la red de docentes asociados a Núcleo Lúdico.

🏆 Créditos y licencias
Desarrollo y conceptualización: Núcleo Lúdico — Profesor Gonzalo Díaz Tapia y equipo colaborador.

IA local: Ollama/Llama3 (modelo open source).

Inspiración pedagógica: Paulo Freire, Gabriela Mistral, Henry Giroux, Peter McLaren.

Licencia: MIT/Educacional, ver detalles en LICENSE.

❤️ Reflexión final
La historia es un proceso vivo, colectivo y siempre inacabado.
“Conversaciones con la Historia” no es solo una app: es una invitación a aprender dialogando, a recordar con sentido y a transformar la escuela con ética, memoria y juego.

🚦 ¿Dudas o sugerencias?
Contáctanos: [soporte@nucleoludico.cl]

Mejoras y colaboraciones: ¡El código es tuyo! Cualquier docente o estudiante puede proponer cambios y crecer juntos.

¡Instala, dialoga y haz historia!
