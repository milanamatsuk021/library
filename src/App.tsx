import { FormEvent, useState } from "react";
import "./index.css";

type Book = {
  id: number;
  title: string;
  author: string;
};

const startingBooks: Book[] = [
  { id: 1, title: "Война и мир", author: "Лев Толстой" },
  { id: 2, title: "Преступление и наказание", author: "Фёдор Достоевский" },
];

export default function App() {
  const [books, setBooks] = useState<Book[]>(startingBooks);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    const newBook: Book = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim() || "Неизвестный автор",
    };

    setBooks([...books, newBook]);
    setTitle("");
    setAuthor("");
  };

  const handleDelete = (id: number) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="page">
      <h1 className="title">Моя первая библиотека</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Название книги</span>
          <input
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder="Например, Гарри Поттер"
          />
        </label>

        <label className="field">
          <span>Автор</span>
          <input
            value={author}
            onChange={event => setAuthor(event.target.value)}
            placeholder="Можно оставить пустым"
          />
        </label>

        <button type="submit" className="button">
          Добавить в список
        </button>
      </form>

      <ul className="list">
        {books.map(book => (
          <li key={book.id} className="card">
            <div>
              <strong>{book.title}</strong>
              <p>{book.author}</p>
            </div>
            <button className="remove" onClick={() => handleDelete(book.id)}>
              Удалить
            </button>
          </li>
        ))}
        {books.length === 0 && (
          <li className="empty">Здесь пока нет книг. Добавьте что-нибудь!</li>
        )}
      </ul>
    </div>
  );
}
