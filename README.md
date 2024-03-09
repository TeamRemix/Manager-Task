
# Manage-Task

El Manage-Task  es una aplicación web diseñada para ayudarte a organizar tus tareas diarias de manera eficiente. Con esta aplicación, puedes crear, actualizar y eliminar tareas de forma sencilla, lo que te permite mantener un control total sobre tu lista de tareas pendientes.


## Instalacion 

Clona este repositorio en tu máquina local

```bash
  git clone https://github.com/TeamRemix/Manager-Task.git

```

Cambia al directorio del proyecto
```bash
  cd Manager-Task

```
Instala las dependencias utilizando npm
```bash
  npm install

```

Configura la conexión a la base de datos Mysql  en el archivo de configuración _Manager-Task/src/configdb/keys.js_

```javascript
export const database = {
  host: 'localhost',
  user: 'tu_usuario_de_la_base_de_datos',
  password: 'la_contraseña_de_tu_usuario',
  database: 'MANAGER_TASK',
}

```

## creacion de la base de datos
  1. Crear la base de datos llamada     _Manager-Task_
  2. Ejecutar en orden los queries que se   encuentran en el archivo _database.sql_   que está en la raíz del proyecto.


## Poner en marcha el proyecto

Estando en la raiz del proyecto cambiar al directorio _src_

*linux*
```bash
  cd src/
```
*Windows*
```bash
  cd src\
```

luego ejecuta

```bash
  npm run dev
```

Por ultimo habre esta url en el navegador
_http://localhost:4600/singup_

## Autores

- [@TeamRemix](https://github.com/TeamRemix)


## License

[MIT](https://choosealicense.com/licenses/mit/)

