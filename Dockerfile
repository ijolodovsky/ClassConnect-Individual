# Usar una imagen base de Node.js
FROM node:16

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de configuración (package.json y package-lock.json)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todo el código al contenedor
COPY . .

# Exponer el puerto en el que la API corre
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
