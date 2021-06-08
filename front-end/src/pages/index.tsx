import { GetServerSideProps } from "next";
import React, { FormEvent, useCallback, useState } from "react";
import { prisma } from "../prisma";
import { Books } from "@prisma/client";
import styles from "../styles/home.module.scss";
import axios from "axios";

type HomeProps = {
  books: Books[];
};

export default function Home({ books }: HomeProps) {
  const [createBooks, setCreateBooks] = useState<Books>({} as Books);
  const [allBooks, setAllBooks] = useState(books);

  const handleChange = useCallback(
    (
      event: React.FormEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
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

  console.log(createBooks);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <img src="/icons/logo.svg" />
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
          <textarea
            placeholder="Digite o autor do livro"
            name="description"
            onChange={handleChange}
            rows={5}
          ></textarea>
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
            <option value="Nunca">Nunca</option>
            <option value="Não">Não</option>
            <option value="Talvez sim">Talvez sim</option>
            <option value="Sim">Sim</option>
            <option value="Recomendaria demais!">Recomendaria demais!</option>
          </select>
        </div>
        <button type="submit">Enviar</button>
      </form>

      <div className={styles.books_container}>
        {allBooks.map((book, index) => {
          return (
            <div key={index}>
              <h3>{book.author}</h3>
              <span>{book.title}</span>

              <small>{book.description}</small>
              <section>
                <span>
                  <strong>Nota:</strong> {book.rate}
                  <img
                    src={
                      book.rate >= 5 ? "/icons/feliz.svg" : "/icons/bravo.svg"
                    }
                  />
                </span>
                <span>Recomenda este livro? {book.recommends}</span>
              </section>
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
