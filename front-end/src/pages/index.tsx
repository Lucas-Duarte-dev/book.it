import { GetServerSideProps } from "next";
import { FormEvent, useState } from "react";
import { prisma } from "../prisma";
import { Books } from "@prisma/client";

type HomeProps = {
  books: Books[];
};

export default function Home({ books }: HomeProps) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState(0);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input_block">
          <label>Autor</label>
          <input
            type="text"
            placeholder="Digite o autor do livro"
            onChange={(e) => setAuthor(e.currentTarget.value)}
          />
        </div>
        <div className="input_block">
          <label>Qual o titulo do livro</label>
          <input
            type="text"
            placeholder="Digite o autor do livro"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <div className="input_block">
          <label>Dê uma breve descrição</label>
          <input
            type="text"
            placeholder="Digite o autor do livro"
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>
        <div className="input_block">
          <label>Dê uma nota de 1 a 10 para este livro</label>
          <input
            type="range"
            placeholder="Digite o autor do livro"
            onChange={(e) => setRate(Number(e.currentTarget.value))}
            min={0}
            max={10}
            value={rate}
          />
          <small>{rate.toString()}</small>
        </div>
        <button type="submit">Enviar</button>
      </form>

      <div>
        {books.map((book) => {
          return (
            <div key={book.id}>
              <h3>{book.author}</h3>
              <span>{book.title}</span>
              <br></br>
              <small>{book.description}</small>
              <div>
                <p>Nota: {book.rate}</p>
                <span>
                  Recomenda este livro?{" "}
                  {book.recommends ? "Simm!!" : "Nem um pouco"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const books = await prisma.books.findMany();

  return {
    props: {
      books,
    },
  };
};
