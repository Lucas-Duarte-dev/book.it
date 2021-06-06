import { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../../prisma";

export default async (request: VercelRequest, response: VercelResponse) => {
  const { author, title, description, rate, recommends } = request.body;

  const books = await prisma.books.create({
    data: { author, title, description, rate, recommends },
  });

  response.status(201).json(books);
};
