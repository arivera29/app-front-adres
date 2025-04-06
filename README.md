# README

## Instalación, compilación y ejecución en entorno local

### Requisitos previos
- Node.js (versión 16 o superior)
- npm (versión 7 o superior)
- Docker y Docker Compose (opcional para la sección de Docker)

### Instalación
1. Clona el repositorio:
    ```bash
    git clone https://github.com/usuario/app-front-adres.git
    cd app-front-adres
    ```
2. Instala las dependencias:
    ```bash
    npm install
    ```

### Compilación
Para compilar la aplicación:
```bash
npm run build
```
Esto generará los archivos estáticos en la carpeta `dist`.

### Ejecución
Para ejecutar la aplicación en modo desarrollo:
```bash
npm start
```
La aplicación estará disponible en `http://localhost:3000`.

---

## Compilación y ejecución con Docker

### Construir la imagen Docker
1. Asegúrate de estar en el directorio raíz del proyecto.
2. Construye la imagen Docker:
    ```bash
    docker build -t app-front-adres .
    ```

### Ejecutar el contenedor Docker
1. Ejecuta el contenedor:
    ```bash
    docker run -p 3000:3000 app-front-adres
    ```
2. Accede a la aplicación en `http://localhost:3000`.

