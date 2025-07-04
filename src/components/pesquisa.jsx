export default function BarraDePesquisa({ search, setSearch, buscarLivrosISBN, buscarLivrosNome }) {
    return (
      <div className='pesquisa'>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Digite o ISBN ou o Nome do livro"
        />
        <button type="button" onClick={buscarLivrosISBN} className="btn btn-success">
          Buscar por ISBN
        </button>
        <button type="button" onClick={buscarLivrosNome} className="btn btn-success">
          Buscar por Nome
        </button>
      </div>
    );
  }
  