import mongoose from 'mongoose';

const LivroSchema = new mongoose.Schema({
  id: String,
  titulo: String,
  autores: [String],
  isbn: String,
  status: {
    type: String,
    enum: ['disponível', 'reservado'],
    default: 'disponível',
  },
});

export default mongoose.models.Livro || mongoose.model('Livro', LivroSchema);