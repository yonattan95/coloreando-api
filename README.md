# API de Coloreando

APi con basicos endpoints que permite listar los colores de manera paginada, asi como tambien una versión expandible de un color seleccionado. Tambien, permite agregar nuevo colores a la lista de colores.

## Puedes visitarlo en

* [URL base del API desplegado en Heruku](https://coloreando-api.herokuapp.com/api/v1)
* [Repositorio en Github](https://github.com/yonattan95/coloreando-api)
* [Documentación del API](https://coloreando-api.herokuapp.com/api-docs)

## Tecnologías implicadas

- [NodeJs](https://nodejs.org/): Entorno de ejecución de JS en el lado del servidor
- [Express](https://expressjs.com/): Micro framework para NodeJs
- [PostgreSQL](https://www.postgresql.org/): Motor de base de datos relacional
- [Jest](https://jestjs.io/): Framework para testing
- [Supertest](https://github.com/visionmedia/supertest#readme): Libreria para testing de endpoints
- [Swagger](https://swagger.io/): Herramienta progresiva para el diseño y documentación de APIs
- [Docker](https://www.docker.com/): Plataforma que permite gestionar aplicaciones a través de contenedores

## Requisitos

- NodeJs 12+
- PostgreSQL 13+
- Yarn 1.x
- Docker

## Ejecutar en local

```sh
# Instalación de dependencias
$ yarn install
# Iniciar el proceso
$ yarn start
```

## Ejecutar con Docker

```sh
# Crea la imagen
$ docker build -t coloreando-api .
# Ejecuta el contenedor
$ docker run -p 3001:3001 -d coloreando-api
```