Cómo levantar el proyecto en local

El proyecto está dividido en dos carpetas principales: `backend` y `frontend`. Se deben iniciar ambos servidores para que la aplicación funcione correctamente.

BACKEND
Configuración del Backend

1.  **Navega a la carpeta del backend:**
cd backend

2.  **Instala las dependencias:**
npm install

3.  **Configura las variables de entorno:**
    Crea un archivo .env en la raíz de la carpeta backend y agrega las siguientes variables:

    env
    # Puerto en el que correrá el servidor backend
    PORT=3000

    # URL del frontend para la configuración de CORS
    FRONTEND_URL=http://localhost:5173

4.  **Inicia el servidor backend:**
    node index.js
    El servidor backend estará corriendo en `http://localhost:3000`.


FRONTEND
Configuración del Frontend

1.  **Abre una nueva terminal y navega a la carpeta del frontend:**
    cd frontend

2.  **Instala las dependencias:**
    npm install

3.  **Inicia el servidor de desarrollo del frontend:**
    npm run dev
    La aplicación de React estará disponible en `http://localhost:5173`.

¡Y listo! Ahora se puede abrir `http://localhost:5173` en el navegador para usar la aplicación de lista de tareas.

![Captura de pantalla](./frontend/src/assets/Captura%20de%20pantalla%202025-07-14%20175043.png)
![Captura de pantalla](./frontend/src/assets/Captura%20de%20pantalla%202025-07-14%20175102.png)
![Captura de pantalla](./frontend/src/assets/Captura%20de%20pantalla%202025-07-14%20175111.png)
![Captura de pantalla](./frontend/src/assets/Captura%20de%20pantalla%202025-07-14%20175147.png)
![Captura de pantalla](./frontend/src/assets/Captura%20de%20pantalla%202025-07-14%20175155.png)
![Captura de pantalla](./frontend/src/assets/Captura%20de%20pantalla%202025-07-14%20175300.png)
![Captura de pantalla](./frontend/src/assets/Captura%20de%20pantalla%202025-07-14%20175310.png)
![Captura de pantalla](./frontend/src/assets/Captura%20de%20pantalla%202025-07-14%20175338.png)
![Captura de pantalla](./frontend/src/assets/Captura%20de%20pantalla%202025-07-14%20175349.png)
