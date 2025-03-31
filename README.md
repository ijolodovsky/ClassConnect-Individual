# Proyecto API ClassConnect con Docker

## Tabla de Contenido

1. [Introducción](#introducción)
2. [Lo más desafiante](#lo-más-desafiante)
3. [Pre-requisitos](#pre-requisitos)
4. [Guía de usuario - Librería de tests](#guía-de-usuario---librería-de-tests)
5. [Comandos para construir la imagen de Docker](#comandos-para-construir-la-imagen-de-docker)
6. [Comandos para correr la base de datos](#comandos-para-correr-la-base-de-datos)
7. [Comandos para correr el servicio](#comandos-para-correr-el-servicio)
8. [Pruebas](#pruebas)
9. [Detener los contenedores](#detener-los-contenedores)

## Introducción

Este proyecto consiste en una API RESTful construida con Node.js que permite la creación y gestión de cursos en una plataforma educativa. Utilizando una base de datos PostgreSQL, la aplicación permite a los usuarios crear, visualizar y eliminar cursos. Todo el entorno se ejecuta dentro de contenedores Docker para asegurar una configuración sencilla y coherente entre entornos de desarrollo. La API está diseñada para ser escalable, eficiente y fácil de probar, proporcionando respuestas en formato JSON y cumpliendo con los estándares RESTful.

## Lo más desafiante

Lo más desafiante de este proyecto fue configurar y asegurar la comunicación entre la API y la base de datos PostgreSQL dentro de un entorno Dockerizado. La integración de contenedores para que trabajen de manera fluida, con la persistencia de los datos y la configuración adecuada de las variables de entorno, presentó algunos deafios. Además, garantizar que las pruebas funcionen correctamente en este entorno fue otro desafío importante.

## Pre-requisitos

Antes de levantar el entorno de desarrollo, asegurarse de tener instalados los siguientes elementos:

- **Docker**: Versión 27.5.1
- **Docker Compose**: Versión 2.32.4

## Guía de usuario - Librería de tests

- **Jest** (https://jestjs.io/docs/getting-started): Librería utilizada para realizar pruebas de la API.

## Comandos para construir la imagen de Docker

Para construir las imágenes de Docker necesarias para este proyecto, ejecuta el siguiente comando desde la raíz del proyecto:

```bash
docker-compose build
```

## Comandos para correr la base de datos

Para correr la base de datos PostgreSQL dentro de un contenedor Docker, utiliza el siguiente comando:

```bash
docker-compose up db
```

Este comando iniciará el contenedor de la base de datos PostgreSQL.

## Comandos para correr el servicio

Una vez que la base de datos esté corriendo, se puede iniciar el servicio de la API ejecutando el siguiente comando:

```bash
docker-compose up app
```

Este comando iniciará el contenedor de la API en el puerto declarado en el .env

## Pruebas

Para ejecutar las pruebas, se usa el siguiente comando:

```bash
docker-compose run --rm -e NODE_ENV=test app npm test
```

Donde run --rm inicia un nuevo contenedor temporalmente y lo elimina al finalizar para correr los tests.

## Detener los contenedores

Cuando hayas terminado de trabajar con los contenedores, podes detenerlos con el siguiente comando:

```bash
docker-compose down
```
