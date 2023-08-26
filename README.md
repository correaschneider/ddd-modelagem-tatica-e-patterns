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

## Aula Prática 3 - Regras de negócio
Para transformar uma entidade anêmica em uma entidade precisamos remover os `getters` e os `setters` e adicionar as regras de negócios.

1. Deletar os `getters` e os `setters` e adicionar as regras de negócios.
```ts
class Customer {
    _id: string;
    _name: string;
    _address: string;
    _active: boolean = true;

    constructor(id: string, name: string, address: string) {
        this._id = id;
        this._name = name;
        this._address = address;
    }

    changeName(name: string) {
        this._name = name;
    }

    activate() {
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }
}
```

> Visivelmente os métodos `set name` e `changeName`, são parecidos, mas com o método `changeName`, podemos adicionar mais regras de negócios como validações, além de também passar mais propriedade e expressividade sobre o que deve ser feito com o valor.

## Aula Prática 4 - Consistência constante em primeiro lugar
Devemos garantir sempre que a entidade receba todos os paramêtros corretos para ser iniciado

## Aula Prática 5 - Princípio da autovalidação
A própria entidade deve se autovalidar o tempo todo, garantindo a consistência das informações.

1. Adicionar na entitade `src/entity/customer.ts` o método `validate()`
```ts
    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }
```

2. Chamar esse novo método no `construtor` e onde mais for necessário para garantir a integridade dos dados.
```ts
    constructor(id: string, name: string, address: string) {
        this._id = id;
        this._name = name;
        this._address = address;

        this.validate();
    }

    changeName(name: string) {
        this._name = name;

        this.validate();
    }
```

3. Para atender um regra de negócio hipotética no nosso exemplo, só podemos ativar o customer quando temos o endereço preenchido. Alteramos o valor inicial da propriedade `_active` e adicionamos uma validação no método `activate`.
```ts
    _active: boolean = false;

    activate() {
        if (this._address.length === 0) {
            throw new Error("Address is mandatory to activate a customer");
        }

        this._active = true;
    }
```
