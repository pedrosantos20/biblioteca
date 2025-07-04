
# 📚 Sistema de Gerenciamento de Livros

Este projeto é uma aplicação web construída com **Next.js** e **MongoDB**, que permite buscar livros por título ou ISBN, cadastrar no banco de dados, listar, excluir e alterar o status entre **disponível** e **reservado**.

---

## 🚀 Funcionalidades

- 🔎 Buscar livros por **título** ou **ISBN**
- ✅ Cadastrar livros no **MongoDB**
- 📋 Listar todos os livros cadastrados
- 🗑️ Excluir livro do banco de dados
- 🔁 Alternar status do livro (disponível/reservado)

---

## 🛠️ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Bootstrap](https://getbootstrap.com/)

---

## ⚙️ Requisitos

- Node.js v18 ou superior
- MongoDB local ou MongoDB Atlas

---

## 📁 Estrutura de Pastas

```
app/
├── api/
│   └── livros/
│       └── route.js      # Rotas da API (GET, POST, PATCH, DELETE)
├── components/
│   ├── BarraDePesquisa.jsx
│   └── ResultadoLivroBD.jsx
├── models/
│   └── Livro.js          # Schema do Mongoose
├── server/
│   └── connect.js        # Conexão com MongoDB
├── page.jsx              # Página principal (Home)
├── globals.css           # Estilo global
```

---

## 📷 Interface

- Campo de busca para título ou ISBN
- Botões de busca, exclusão e edição
- Lista com título, autor, ISBN e status do livro

---

## ✍️ Possíveis melhorias futuras

- Autenticação e autorização
- Paginação e ordenação da lista
- Upload de imagem da capa do livro

---
