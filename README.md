# Fasti_PT_Server 🔧

Backend del sistema de punto de venta desarrollado como parte de la prueba técnica para **Abarrotes FASTI S.A. de C.V.**

Este servidor proporciona la API RESTful que permite gestionar usuarios, productos, ventas, compras, cortes de venta y control de inventario, con roles diferenciados (Gerente y Cajero).

---

## 📌 Características principales

- API REST para operaciones CRUD sobre productos, usuarios, ventas y compras.
- Autenticación con JSON Web Tokens (JWT).
- Control de acceso basado en roles.
- Registro de logs de inicio de sesión y movimientos de inventario.
- Generación de cortes por turno y por día.
- Conexión con base de datos MySQL/MariaDB.

---

## 🚀 Tecnologías utilizadas

| Herramienta        | Descripción                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| **Node.js**        | Entorno de ejecución para JavaScript en el servidor                         |
| **Express.js**     | Framework web para construir la API REST de forma estructurada              |
| **MySQL2**         | Cliente de MySQL para Node.js                                                |
| **JWT**            | Autenticación segura sin sesiones                                           |
| **bcryptjs**       | Encriptación de contraseñas                                                  |
| **dotenv**         | Gestión de variables de entorno                                              |
| **CORS**           | Middleware para permitir solicitudes desde el frontend                      |

---

## ⚙️ Requisitos para instalación

- Node.js v18 o superior
- npm v9 o superior
- MySQL o MariaDB (v10 o superior)
- Editor de texto como Visual Studio Code

---

## 📦 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Alba2809/Fasti_PT_Server.git
   cd Fasti_PT_Server
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz con el siguiente contenido:

   ```
   TOKEN_SECRET=something secret
   FRONTEND_URL=http://localhost:5173
   HOST_MYSQL=localhost
   USER_MYSQL=root
   PASSWORD_MYSQL=
   DATABASE_MYSQL=prueba_tecnica
   PORT_MYSQL=3306
   PORT=4000
   ```

   > Estos valores son los valores de ejemplo. Puedes cambiarlos según tus necesidades. Sin embargo, el nombre de la base de datos debe ser `prueba_tecnica`. Y, en caso de que no tenga contraseña, puedes dejarla en blanco.
   
   > El valor de `FRONTEND_URL` es el URL del frontend. Debe indicar la ruta/puerto en el que se ejecuta el servidor del frontend.

   > El valor de `PORT` es el puerto en el que se ejecutará el servidor de Node.js. Puedes cambiarlo según tus necesidades.

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. La API estará disponible (por defecto) en:

   ```
   http://localhost:4000
   ```

---

## 🔐 Endpoints principales

- `/api/login` - Autenticación
- `/api/products` - Productos
- `/api/sales` - Ventas
- `/api/purchases` - Compras
- `/api/sales-cuts` - Cortes de venta
- `/api/logs` - Historial de acciones

---

## 📄 Licencia

Este proyecto fue desarrollado exclusivamente para fines de evaluación técnica.  
No está destinado a producción ni distribución comercial.

---

Desarrollado por **José Iván Alba García**  