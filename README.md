
<p align="center">
  <img width="600"  src="https://raw.githubusercontent.com/lalopez13/bog001-md-links/feature/path/img/links-md.jpg">
</p>

Busca, valida y genera estadísticas de los links que se encuentran en archivos markdown.

## CLI
Recibe como argumento un archivo con extensión .md o una directorio que contenga uno o varios archivos con la misma extensión.

## Instalación

<img width="500"  src="https://raw.githubusercontent.com/lalopez13/bog001-md-links/feature/path/img/mdLinks--install.png">

La instalación puede ser de manera global 
````
$ nmp install -g @lalopez13/md-links
````


## Ejemplo 

La aplicación debe poder ejecutarse de la siguiente manera a través de la terminal:

<img width="500"  src="https://raw.githubusercontent.com/lalopez13/bog001-md-links/feature/path/img/mdLinks%20-cli.png">

El comportamiento por defecto no valida el status de las urls 

<img width="500"  src="https://raw.githubusercontent.com/lalopez13/bog001-md-links/feature/path/img/mdLinks-default.png">


## Opciones

### --validate

<img  width="500"  src="https://raw.githubusercontent.com/lalopez13/bog001-md-links/feature/path/img/mdLinks--validate.png">

El módulo hace una petición HTTP para averiguar si el link funciona o no. Devolviendo un reporte con el estado del link y datos importantes.

### --stats

<img  width="500"  src="https://raw.githubusercontent.com/lalopez13/bog001-md-links/feature/path/img/mdlInks--stats.png">

Si pasamos la opción --stats el output (salida) será un texto con estadísticas básicas sobre los links.

### --stats y --validate 

<img  width="500"  src="https://raw.githubusercontent.com/lalopez13/bog001-md-links/feature/path/img/mdLinks--stats--validate.png">

Para obtener estadísticas que necesiten de los resultados de la validación.

### --help

<img  width="500"  src="https://raw.githubusercontent.com/lalopez13/bog001-md-links/feature/path/img/mdLinks--help.png">

Para obtener ayuda sobre las diferentes opciones.


## Uso como módulo

````
$ nmp install @lalopez13/md-links
````
<img  width="600"  src="https://raw.githubusercontent.com/lalopez13/bog001-md-links/feature/path/img/mdLinks%20--require.png">

