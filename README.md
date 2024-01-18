# PRUEBA TÉCNICA CB

## Contenido
  * [Descripción](#descripcion)
  * [Prerrequisitos](#prerrequisitos)
  * [Despliegue en Docker utilizando el docker-compose](#despliegue)

<a name="descripcion"></a>
## Descripción

Este proyecto contiene la información necesaria para desplegar el frontend del proyecto en Docker

### Framework utilizado:
* Next.JS: Versión 13.4.4 [Sitio Oficial][LinkNextJS]

[LinkNextJS]: https://nextjs.org/

<a name="prerrequisitos"></a>
## Prerrequisitos

* Tener instalado Docker [Sitio Oficial][LinkDocker]

[LinkDocker]: https://www.docker.com/products/docker-desktop/

* Se requiere de conexión a Internet para descargar el proyecto, la imágen base de Node, además de las librerías y dependencias.

* Tener desplegado el backend [Link al Repositorio][LinkBackend]

[LinkBackend]: hhttps://github.com/jrgranada/cb_entertainment_backend/tree/main

<a name="despliegue"></a>
## Despliegue en Docker

### Clonar el proyecto:
Desde la línea de comando del sistema, ingrese a la carpeta donde quiere descargar el proyecto y ejecute la siguiente instrucción:

```bash
git clone https://github.com/jrgranada/cb_entertainment_frontend.git
```

### Configuración previa al despliege

La única configuración previa al despliegue que se debe realizar es indicarle a la aplicación cuál es la URL donde se encuentra desplegado el backend, para ello debe seguir las siguientes instrucciones:

1. Ubique el archivo llamado ```.env``` que se encuentra dentro de la carpeta del proyecto.

2. Abra el archivo con un editor de texto plano, como por ejemplo el bloc de notas.

3. Ubique la clave ```NEXT_PUBLIC_URL_BACKEND``` que tiene el valor ```https://localhost:32776```, usted debe cambiar la URL o en su defecto sólo el puerto, de acuerdo al asignado al backend durante el despliegue.

4. Guarde los cambios en el archivo y ciérrelo.

### Despliegue de la solución

Para el despliegue de la solución se debe ejecutar la siguiente instrucción desde la línea de comandos, estando ubicado dentro de la carpeta del proyecto:

```bash
docker-compose -p "cb_entertainment_frontend" up -d
```

### Accediendo a la aplicación

Para acceder a la aplicación vaya la url http://localhost:3000
