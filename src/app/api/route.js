import connectToDatabase from '@/app/server/connect';
import Livro from '@/app/models/Livro';

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    const filtro = query
      ? {
          $or: [
            { titulo: { $regex: query, $options: 'i' } },
            { isbn: { $regex: query, $options: 'i' } }
          ]
        }
      : {};

    const livros = await Livro.find(filtro).lean();

    return new Response(JSON.stringify(livros), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET /api erro:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar livros' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await connectToDatabase();

    const livroExistente = await Livro.findOne({ id: data.id });
    if (livroExistente) {
      return new Response(JSON.stringify({ message: 'Livro já cadastrado.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const novoLivro = await Livro.create({
      ...data,
      status: 'disponível',
    });

    return new Response(JSON.stringify(novoLivro), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('POST /api erro:', error);
    return new Response(JSON.stringify({ error: 'Erro ao salvar livro' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID não fornecido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await Livro.findByIdAndDelete(id);

    return new Response(JSON.stringify({ message: 'Livro deletado com sucesso' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('DELETE /api erro:', error);
    return new Response(JSON.stringify({ error: 'Erro ao deletar livro' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PATCH(request) {
  try {
    await connectToDatabase();
    const { id, status } = await request.json();

    if (!id || !status) {
      return new Response(JSON.stringify({ error: 'ID e status são obrigatórios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const livroAtualizado = await Livro.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return new Response(JSON.stringify(livroAtualizado), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('PATCH /api erro:', error);
    return new Response(JSON.stringify({ error: 'Erro ao atualizar status' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}