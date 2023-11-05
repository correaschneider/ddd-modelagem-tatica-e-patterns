# DDD: Modelagem Tática e Patterns

## Antes de tudo
Estou usando o docker, para rodar o projeto, precisa subir o container e acessar o terminal do mesmo.

```shell
docker compose up -d app
docker compose exec app bash
```

## Entidades

### Aula Prática 1 - Configurando projeto typescript
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

### Aula Prática 2 - Criando entidade anêmica
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

### Aula Prática 3 - Regras de negócio
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

### Aula Prática 4 - Consistência constante em primeiro lugar
Devemos garantir sempre que a entidade receba todos os paramêtros corretos para ser iniciado

### Aula Prática 5 - Princípio da autovalidação
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

### Aula Prática 6 - Entidade VS ORM
Quando trabalhamos com ORM, precisamos ter uma entidade anêmica, podemos chamar ela de model e criar separadamente da nossa entidade.
A Entidade possui um complexidade de negócio, ela é o nosso _Domain_, onde estão nossas regras de negócio. Já a Entidade Anêmica, possui uma complexidade acidental, relacionada a nossa infra (banco de dados), necessitando de `getters` e `setters`.

## Value Objects

### Aula Teórica 1 - Introdução aos objetos de valor
Precisamos tornar o nosso software em um software expressivo. Para isso não podemos simplesmente trabalhar com tipos primitivos, mas também criar nossos próprios tipos já pensando nas regras de negócio.

### Aula Teórica 2 - Entendendo Value Objects
"Quando você se preocupa apenas com os atributos de um elemento de um model, classifique isso como um Value Object" - Evans, Eric. Domain-Driven Design (p. 99) Person Education. Kindle Edition.
"Trate o Value Object como imutável" - Evans, Eric. Domain-Driven Design (p. 99) Person Education. Kindle Edition.

Crie seus próprios tipos, por exemplo, ao invés de usar `string` para CPF, crie o tipo `CPF`, onde nele vai ter dois atributos, o número do CPF e o dígito verificador.
```ts
class CPF {
    _number: number;
    _digit: number;

    constructor(number: number, digit: number) {
        this._number = number;
        this._digit = digit;

        this.validate();
    }

    validate() {
        // Realizar cálculos para verificação do CPF
    }

    toString() {
        // Retornar CPF sem máscara
    }

    toStringMasked() {
        // Retornar CPF com máscara
    }
}
```

### Aula Prática 1 - Value Objects na prática
Definindo um exemplo de Value Object, usamos o Address como exemplo.

1. Criamos o arquivo `src/entity/address.ts`, com o conteúdo:
```ts
export default class Address {
    _street: string = '';
    _number: number = 0;
    _zip: string = '';
    _city: string = '';

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;

        this.validate();
    }

    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }
        if (this._number === 0) {
            throw new Error("Number is required");
        }
        if (this._zip.length === 0) {
            throw new Error("Zip is required");
        }
        if (this._city.length === 0) {
            throw new Error("City is required");
        }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zip}, ${this._city}`;
    }
}
```

2. Alteramos a entidade de Customer
```ts
import Address from './address';

class Customer {
    _id: string;
    _name: string = '';
    _address!: Address;
    _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;

        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    changeName(name: string) {
        this._name = name;

        this.validate();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    set Address(address: Address) {
        this._address = address;
    }
}

```

## Agregados

### Aula Prática 1 - Agregados na Prática
Criando `order` e `order_item` e agregando tudo na `main`

## Testes
Criando testes com Jest e melhorias nas classes `order` e `customer`, criando classe de `product` e seus testes.

### Agregados até agora
1. Customer => Address // Agregado de Customer tem relação via objeto de Address por ser relação direta
1. Order => OrderItem // Agregado de Order tem relação via objeto de OrderItem por ser relação direta, já com Customer é pelo id do Customer pois são agregados distintos, e o OrderItem tem relação pelo id do Product, também por estar em agregados diferentes
1. Product

## Domain Services
São métodos que não se encaixam nas entidades.

### Aula Prática 1 - Definindo nosso ProductService
Criando teste do `ProductService`
