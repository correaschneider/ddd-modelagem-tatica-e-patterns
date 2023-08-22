# DDD: Modelagem Tática e Patterns

## Antes de tudo
Estou usando o docker, para rodar o projeto, precisa subir o container e acessar o terminal do mesmo.

```shell
docker compose up -d app
docker compose exec app bash
```

## Aula Prática 1 - Configurando projeto typescript
Criar e configurar um projeto básico para utilizar nas demais aulas.

1. Instalar typescript e tslint
```shell
npm i -D typescript tslint
```

2. Iniciar projeto em TS
```shell
npx tsc --init
```

3. Iniciar configurações TSLint
```shell
npx tslint --init
```

4. Configurar `tsconfig.json` para o básico
```json
{
  "compilerOptions": {
    "incremental": true, /* Habilitar, para compilar apenas o que foi alterar nas edições de arquivos */
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist", /* Toda vez que compilar, mantém o compilado separado do source */
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": [ /* Mantém os arquivos dentro da pasta src */
    "src/**/*.ts"
  ]
}
```

5. Para testar as configurações, criar arquivo `src/test.ts`, com o conteúdo:
```ts
export function hello(name: string): string {
    return `Hello, ${name}`
}
```

6. Após código gerado, executar o build
```shell
npx tsc
```
