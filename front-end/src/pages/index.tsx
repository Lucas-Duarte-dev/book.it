import axios from "axios";
import { FormEvent, useState } from "react";

export default function Home() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await axios.post("/api/books", {
      author,
      title,
      description,
    });
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
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
