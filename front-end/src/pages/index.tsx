import { GetServerSideProps } from "next";
import React, { FormEvent, useCallback, useState } from "react";
import { prisma } from "../prisma";
import { Books } from "@prisma/client";
import axios from "axios";

type HomeProps = {
  books: Books[];
};

export default function Home({ books }: HomeProps) {
  const [createBooks, setCreateBooks] = useState<Books>({} as Books);
  const [allBooks, setAllBooks] = useState(books);

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
      setCreateBooks({
        ...createBooks,
        [event.currentTarget.name]:
          event.currentTarget.name === "rate"
            ? Number(event.currentTarget.value)
            : event.currentTarget.value,
      });
    },
    [createBooks]
  );

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await axios.post("/api/books", createBooks);

    setAllBooks([...allBooks, createBooks]);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input_block">
          <label>Autor</label>
          <input
            type="text"
            placeholder="Digite o autor do livro"
            name="author"
            onChange={handleChange}
          />
        </div>
        <div className="input_block">
          <label>Qual o titulo do livro</label>
          <input
            type="text"
            placeholder="Digite o autor do livro"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="input_block">
          <label>Dê uma breve descrição</label>
          <input
            type="text"
            placeholder="Digite o autor do livro"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="input_block">
          <label>Dê uma nota de 1 a 10 para este livro</label>
          <input
            type="range"
            placeholder="Digite o autor do livro"
            name="rate"
            onChange={handleChange}
            min={0}
            max={10}
          />
          <small>{createBooks.rate}</small>
        </div>
        <div className="input_block">
          <label>Você recomendaria esse livro?</label>
          <select name="recommends" onChange={handleChange}>
            <option value="Nunca">Péssimo</option>
            <option value="Não">Não</option>
            <option value="Talvez sim">Razoavel</option>
            <option value="Sim">Simm</option>
            <option value="Recomendaria demais!">Adoreii!</option>
          </select>
        </div>
        <button type="submit">Enviar</button>
      </form>

      <div>
        {allBooks.map((book, index) => {
          return (
            <div key={index}>
              <h3>{book.author}</h3>
              <span>{book.title}</span>
              <br></br>
              <small>{book.description}</small>
              <div>
                <p>Nota: {book.rate}</p>
                <span>Recomenda este livro? {book.recommends}</span>
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
