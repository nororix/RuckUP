# Ruck Up

**Ruck Up** es una plataforma web diseñada para la gestión de entrenamientos y asistencia de equipos de rugby. Permite a jugadores confirmar su asistencia a cada sesión y a entrenadores gestionar los entrenamientos y visualizar la asistencia de su equipo.

## Demo

*[Enlace al proyecto desplegado - Pendiente de configurar]*

## Tecnologías utilizadas

- **Frontend:** React + Vite, React Router, Bootstrap  
- **Backend:** Node.js, Express  
- **Base de datos:** MongoDB Atlas  
- **Autenticación:** JWT  
- **Control de roles:** Middleware con lógica por tipo de usuario  
- **Deploy:** Vercel (frontend), Render/Railway (backend)

## Roles y funcionalidades

### Jugador
- Ver entrenamientos disponibles
- Confirmar o cancelar su asistencia a cada entrenamiento

### Entrenador
- Crear, editar y eliminar entrenamientos
- Ver la lista de asistentes por entrenamiento
- Gestionar horarios y detalles de las sesiones

## Estructura del proyecto

```
/backend
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middlewares/
  └── index.js
/frontend
  ├── src/
      ├── components/
      ├── pages/
      ├── context/
      ├── api/
      └── main.jsx
```

## Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/signup` | Registrar nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/trainings` | Obtener todos los entrenamientos |
| POST | `/api/trainings` | Crear entrenamiento (entrenador) |
| PUT | `/api/trainings/:id` | Editar entrenamiento (entrenador) |
| DELETE | `/api/trainings/:id` | Eliminar entrenamiento (entrenador) |
| POST | `/api/attendance/:id` | Confirmar asistencia (jugador) |
| DELETE | `/api/attendance/:id` | Cancelar asistencia (jugador) |

## Instalación local

### 1. Clonar el repositorio
```bash
git clone https://github.com/[tu-usuario]/ruck-up.git
cd ruck-up
```

### 2. Configurar el backend
```bash
cd backend
npm install
npm run dev
```

### 3. Configurar el frontend
```bash
cd frontend
npm install
npm run dev
```

## Variables de entorno

### Backend - .env
```ini
PORT=3000
MONGO_URI=[tu URI de MongoDB Atlas]
JWT_SECRET=[tu clave secreta]
```

### Frontend - .env
```ini
VITE_API_URL=http://localhost:3000
```

*Nota: Para deploy en producción, `VITE_API_URL` debe apuntar a la URL del backend desplegado*

## Funcionalidades implementadas

- Registro y login diferenciado por rol
- Navegación protegida según el tipo de usuario
- Creación y gestión de entrenamientos por parte del entrenador
- Confirmación y cancelación de asistencia por parte del jugador
- Visualización de asistencia desde el panel del entrenador
- Interfaz responsive adaptada a dispositivos móviles

## Decisiones técnicas

- **JWT** se utilizó para manejar la autenticación y proteger rutas sensibles
- El backend sigue los principios de **separación de responsabilidades** organizando el código en rutas, controladores, modelos y middlewares
- En el frontend se implementó un **contexto global** (AuthContext) para manejar el estado de autenticación y rol de usuario
- La **gestión de roles** permite filtrar contenido y funcionalidades según el tipo de usuario
- **Bootstrap** proporciona la base de estilos con personalizaciones adicionales

## Estado actual y mejoras futuras

### Completado
- Funcionalidad core completa y operativa
- Sistema de autenticación y autorización
- Interfaz responsive y user-friendly

### Posibles mejoras
- Implementación del rol de administrador
- Historial detallado de asistencia
- Sistema de notificaciones y recordatorios
- Estadísticas de participación por jugador
- Integración con calendario externo

---

## Capturas de pantalla

*[Pendiente: Agregar imágenes de los dashboards de jugador y entrenador]*

---

## Autor

Desarrollado como Trabajo de Fin de Máster por **Noelia** – 2025

---

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.