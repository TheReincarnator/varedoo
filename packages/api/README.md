# API

This module provides OpenAPI schema for clients and server stubs generation.

## How to use [OpenAPI generator](https://github.com/OpenAPITools/openapi-generator)


Add `openapi-generator` to `package.json`:
```
cd packages/api
yarn add @openapitools/openapi-generator-cli -D
```

See [here](https://openapi-generator.tech/#try) for details, how to install and use `openapi-generator`.

Then execute the following command to generate a API client for TypeScript:

```
yarn openapi-generator generate -i src/api.json -g typescript-fetch -o ./generated-sources/openapi
```

A comrehensive list of generators for clients and server stubs can be found [here](https://openapi-generator.tech/docs/generators).
