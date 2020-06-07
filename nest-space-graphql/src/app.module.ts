import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';

import { LaunchModule } from './launch/launch.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    /*
      ?NOTA1: La Implementación base del Módulo 
      Graphql (realizado en la ruta por defecto
      del modulo [forRoot] en [imports]).
      ---
      Le especificaremos a Nest la ubicación (directorio)
      de todos los archivos que utilizaremos 
      para construir el esquema principal (o server schema).
      Es decir:
      `typeDefs:[{filepath}]`
      ---
      En esta aplicación deseamos utilizar los tipos (Types)
      por defecto de Typescript como los tipos (Types) 
      de GraphQL. 
      Para lograrlo esto especificaremos el archivo graphql.ts
      de nuestro proyecto como archivo de definiciones para 
      GraphQL:
      `definitions:{path:join(process.cwd(), 'src/graphql.ts')}`
    */
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: { path: join(process.cwd(), 'src/graphql.ts') },
      context: ({ req }) => ({ headers: req.headers }),
    }),

    /**
     * ?NOTA2: A continuación se realiza la implementación
     * de módulos para trabajar con el Adapter y plugin
     * NestJS para conectarse de PostgreSQL:
     * ---
     * En primer lugar se instalan las dependencias
     * para Types para ORMs de NesJS y el driver de
     * PostgreSQL para NodeJS (pg) mediante npm.
     * Se realiza la implementación (en este caso, con parámetros
     * por defecto) del módulo Types de ORMs para
     * nestJS en el AppModule como es requerido por
     * el framework.
     * `TypeOrmModule.forRoot(),`
     * ---
     * En segundo lugar se construye el archivo de
     * configuración y despliegue del servicio de
     * PostgreSQL en docker. Tanto los parámetros
     * de instancia como de conexión se especifican
     * en el archivo docker-compose
     * (./docker-compose.yml).
     * Ejecutar con:
     * `sudo docker-compose up -d`
     * ---
     * En tercer lugar es necesario construir el archivo
     * de conexión para el modulo ORM de PostgreSQL.
     * Este se encuentra ubicado en la raíz del proyecto
     * (./ormconfig.json)
     * ---
     * Finalmente podemos construir las entidades
     * (*\/**\/*.entity.ts) que figurarán como DTOs
     * (Data Transfer Object) para la negociación de
     * los datos con la BD
     */
    TypeOrmModule.forRoot(),
    LaunchModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
