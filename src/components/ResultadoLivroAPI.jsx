export default function ResultadoLivro({ livro, info }) {
  const adicionarLivro = async () => {
    let isbn = '';
    if (info.industryIdentifiers) {
      const isbn13 = info.industryIdentifiers.find(id => id.type === 'ISBN_13');
      const isbn10 = info.industryIdentifiers.find(id => id.type === 'ISBN_10');
      isbn = isbn13?.identifier || isbn10?.identifier || '';
    }

    const livroParaSalvar = {
      id: livro.id,
      titulo: info.title,
      autores: info.authors || ['Autor desconhecido'],
      isbn,
      status: 'disponível',
    };

    const resposta = await fetch('/api/livros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livroParaSalvar),
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      alert('Livro adicionado com sucesso!');
    } else {
      alert(`Erro: ${resultado.message || 'Não foi possível adicionar.'}`);
    }
  };

  return (
    <li key={livro.id}>
      <div className='resultados_texto'>
        <strong>{info.title}</strong><br />
        {info.authors ? info.authors.join(', ') : 'Autor desconhecido'}
      </div>
      <div className='resultados_buttons'>
        <button type="button" className="btn btn-success" onClick={adicionarLivro}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          </svg>
        </button>
      </div>
      <hr />
    </li>
  );
}