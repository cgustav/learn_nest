<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## NestJS & GraphQL

## Conceptos NestJS

## Conceptos GraphQL

## Get Started

Para realizar login:

```GraphQL
mutation {
  login(email: "email here")
}
```

Para autenticar con usuario registrado:

```GraphQL
{
  me {
  id
  email
}
```

En el proceso de autenticación se debe incluir header con token de autorización:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyYWI0MDY4LTJiMTMtNGE5ZS1hYzY1LWE3ZjE5YzNkYWRmZiIsImVtYWlsIjoiZ3N0di5xbmRAb3V0bG9vay5jb20iLCJpYXQiOjE1OTE1MDk1MjJ9.OzVtV6eVDDmjMn_HPZHDdOx_ETTcLdgEhf0p_p4gjMI"
}
```

## Fuentes

- [NestJS GraphQL Docs](https://docs.nestjs.com/graphql/quick-start)
- [Apollo Docs:](https://www.apollographql.com/docs/)
- [Apollo Docs (Query Resolvers):](https://www.apollographql.com/docs/tutorial/resolvers/)
- [Apollo Docs (Schemas):](https://www.apollographql.com/docs/tutorial/schema/)
- [npm PostgreSQL package docs:](https://www.npmjs.com/package/pg)

- [tutorial p2 - Authentication:](https://www.youtube.com/watch?v=Jx-3uMnMuPU)
