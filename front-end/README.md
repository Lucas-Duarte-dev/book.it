## Criando uma conexão no NextJS com o MongoDB

### Instalação

- Instale o MongoDB com `yarn add mongodb` e suas tipagens `yarn add @types/mongodb -D`

Instale também o vercel/node para que possa ter a intelicense na hora de criar sua api
`yarn add @vercel/node`

## Código de conexão com o banco não relacional e função para a criação feedback do livro

```ts
import { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient, Db } from "mongodb";
import url from "url";

let cachedDb: Db = null;

async function connectDB(uri: string): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1);

  const db = client.db(dbName);
  cachedDb = db;
  return db;
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const { author, title, description } = request.body;

  const db = await connectDB(process.env.MONGODB_URI);

  const collection = db.collection("books");

  await collection.insertOne({
    author,
    title,
    description,
    created_at: new Date(),
  });

  return response.status(201).json({ message: "okay" });
};
```

## Adicionando o Prisma no NextJS

### Instalando e fazendo conexão

- Primeiro vamos instalar o prisma com:
  ` yarn add prisma -D` e `yarn add @prisma/cli`
- Após isso vamos rodar o comando: `yarn prisma init` com isso será criado a pasta prisma e um arquivo `.env` onde colocará as informações para conexão com o banco
- No arquivo `schema.prisma` vamos fazer o nosso primeiro model, no meu caso o Book
- Após esta etapa crie um arquivo na pasta `src` chamada `prisma.ts` e nela coloque o seguinte código:

```ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
```

- Após a criação deste arquivo rode o comando `yarn prisma migrate dev` e já era. Você fez sua conexão
