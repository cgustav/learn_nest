# learn_nest

Repositorio para aprendizaje de framework NestJS. 

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


## Instalación

Para instalar nest js en ambiente local (global).

`npm i g @nestjs/cli`

Para crear un nuevo proyecto de NestJS

`nest new project-name`


## Inicio

El scaffold de la aplicación siempre establecerá como **bootstrap** o archivo de partida a **main.ts** dentro del directorio `/src`

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

El `main.ts` básicamente crea una nueva instancia de aplicación NestJS e inicia el listener HTTP para la aplicación en el puerto `3000`.

Podemos observar dentro de la función `bootstrap()` que la clase `NestFactory` expone el método **_estático_** `create(AppModule)`, que es quien, a partir del argumento `AppModule` devuelve el _objeto aplicación_. 

```typescript
  const app = await NestFactory.create(AppModule);
```

Finalmente, el objeto de aplicación es quien expone el método `listen()` para iniciar el servicio un puerto especificado.

```typescript
  await app.listen(3000);
```

Si analizamos el objeto `AppModule` que participa en el método `create()` podemos darnos cuenta rápidamente que es un import (módulo) de typescript:

```typescript
import { AppModule } from './app.module';
```

Al revisar el archivo objetivo del import en `/src/app.module.ts` encontramos los siguiente:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Finalmente podemos observar la estructura básica del directorio `/src` del proyecto

```
src
 -- app.controller.ts
 -- app.module.ts
 -- main.ts
```

Dónde: 
* **app.controller.ts:** Es el controlador básico de una única ruta creado por defecto.
* **app.controller.ts:** Es el módulo raíz de la aplicación, y quien define los controladores, proveedores y otros recursos de la misma.
* **main.ts:** El archivo de entrada de la aplicación, que mediante `NestFactory` crea la instancia de aplicación de NestjS


## Notas:

