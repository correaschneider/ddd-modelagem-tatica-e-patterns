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

## Aula Prática 2 - Criando entidade anêmica
Entidade anêmica, é uma classe que representa a tabela do banco de dados e não possuí regras de negócio. Entidades anêmicas não tem muito a contribuir com o desenvolvimento.

1. Criar arquivo `src/entity/customer.ts`, com o conteúdo:
```ts
class Customer {
    _id: string;
    _name: string;
    _address: string;

    constructor(id: string, name: string, address: string) {
        this._id = id;
        this._name = name;
        this._address = address;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get address(): string {
        return this._address;
    }

    set name(name: string) {
        this._name = name;
    }

    set address(address: string) {
        this._address = address;
    }
}
```