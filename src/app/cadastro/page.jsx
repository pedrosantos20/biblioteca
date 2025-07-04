"use client";
import { useState } from 'react';
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ResultadoLivro from '@/components/ResultadoLivroAPI';
import BarraDePesquisa from '@/components/pesquisa';

export default function Home() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const livrosUnicos = Array.from(new Map(books.map(l => [l.id, l])).values());

  const buscarLivrosISBN = async () => {
    if (search.trim() === '') return;

    const resposta = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(search)}`
    );
    const dados = await resposta.json();
    setBooks(dados.items || []);
  };

  const buscarLivrosNome = async () => {
    if (search.trim() === '') return;

    const query = encodeURIComponent(`intitle:${search}`);
    const resposta = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );
    const dados = await resposta.json();
    setBooks(dados.items || []);
  };
  

  return (
    <div>
      <div className="buscar-livros">
        <h1>Buscar Livros para Cadastrar</h1>
      </div>
      <BarraDePesquisa
        search={search}
        setSearch={setSearch}
        buscarLivrosISBN={buscarLivrosISBN}
        buscarLivrosNome={buscarLivrosNome}
      />
      <div className='resultados'>
        <ul>
          {livrosUnicos.map((livro) => {
              const info = livro.volumeInfo;
              return <ResultadoLivro key={livro.id} livro={livro} info={info} />;
            })}
        </ul>
      </div>
    </div>
  );
}