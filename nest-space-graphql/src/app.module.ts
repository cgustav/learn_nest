import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from "@nestjs/graphql";

import  {join} from "path";

import { LaunchModule } from './launch/launch.module';


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

  ?NOTA2

  ?Fuentes: 

  NestJS GraphQL Docs: https://docs.nestjs.com/graphql/quick-start
  Apollo Docs: https://www.apollographql.com/docs/
  Apollo Docs (Query Resolvers): https://www.apollographql.com/docs/tutorial/resolvers/
  Apollo Docs (Schemas): https://www.apollographql.com/docs/tutorial/schema/

*/
@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths:['./**/*.graphql'],
      definitions:{path: join(process.cwd(), 'src/graphql.ts')}
    }),
    LaunchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
