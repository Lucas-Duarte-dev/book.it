import { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient, Db } from "mongodb";
import url from "url";

let cachedDb: Db = null;

async function connectDB(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1);

  const db = (await client).db(dbName);
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

  return response.status(201).json({ ok: true });
};
