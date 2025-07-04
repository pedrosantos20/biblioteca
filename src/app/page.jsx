'use client';
import { useEffect, useState } from 'react';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarraDePesquisa from '@/components/pesquisa';
import ResultadoLivroBD from '@/components/ResultadoLivroBD';

export default function Home() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    buscarTodosLivros();
  }, []);

  const buscarTodosLivros = async () => {
    try {
      const resposta = await fetch('/api');
  
      if (!resposta.ok) throw new Error('Erro ao buscar livros');
  
      const dados = await resposta.json();
      setBooks(dados);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      setBooks([]);
    }
  };
  

  const buscarLivrosISBN = async () => {
    if (search.trim() === '') return;
  
    try {
      const resposta = await fetch(`/api?q=${encodeURIComponent(search)}`);
      if (!resposta.ok) throw new Error('Erro na busca por ISBN');
  
      const dados = await resposta.json();
  
      const resultadosFiltrados = dados.filter(livro =>
        livro.isbn?.toLowerCase().includes(search.trim().toLowerCase())
      );
  
      setBooks(resultadosFiltrados);
    } catch (error) {
      console.error('Erro ao buscar por ISBN:', error);
      setBooks([]);
    }
  };
  

  const buscarLivrosNome = async () => {
    if (search.trim() === '') return;
  
    try {
      const resposta = await fetch(`/api?q=${encodeURIComponent(search)}`);
      if (!resposta.ok) throw new Error('Erro na busca por nome');
  
      const dados = await resposta.json();
  
      const resultadosFiltrados = dados.filter(livro =>
        livro.titulo?.toLowerCase().includes(search.trim().toLowerCase())
      );
  
      setBooks(resultadosFiltrados);
    } catch (error) {
      console.error('Erro ao buscar por nome:', error);
      setBooks([]);
    }
  };
  
  const deletarLivro = async (id) => {
    await fetch(`/api?id=${id}`, { method: 'DELETE' });
    buscarTodosLivros();
  };

  const alternarStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === 'disponível' ? 'reservado' : 'disponível';

    await fetch('/api', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: novoStatus }),
    });

    buscarTodosLivros();
  };

  return (
    <div>
      <div className="buscar-livros">
        <h1>Buscar Livros Cadastrados</h1>
      </div>

      <BarraDePesquisa
        search={search}
        setSearch={setSearch}
        buscarLivrosISBN={buscarLivrosISBN}
        buscarLivrosNome={buscarLivrosNome}
      />

      <div className='resultados'>
        <ul>
          {books.map((livro) => (
            <ResultadoLivroBD
              key={livro._id}
              livro={livro}
              onDelete={deletarLivro}
              onToggleStatus={alternarStatus}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
