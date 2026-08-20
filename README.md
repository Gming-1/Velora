# 📚 VELORA — The Handy Book Assistant

<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/ChromaDB-FF6F00?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Ollama-000000?style=for-the-badge" />
</p>

**VELORA** is a RAG (Retrieval-Augmented Generation) application designed to search and answer questions based on a local library of books and PDF documents using custom embeddings and vector search.

<p align="center">
  <img src="assets/velora-demo.gif" alt="VELORA Demo" width="900"/>
</p>

---

## 📌 Features

* 📄 **Local PDF Library:** Ingests documents directly from a local `books/` folder.
* ⚡ **FastAPI Backend:** Lightweight Python server processing vector similarity queries.
* 🔍 **Chroma Vector DB:** Persistent vector store for fast document retrieval.
* 💻 **React + Vite Interface:** Dark-themed, responsive chat application built with Tailwind CSS.

---

## 🛠️ Tech Stack

| Layer           | Technology                 |
| :-------------- | :------------------------- |
| **Frontend**    | React (Vite), Tailwind CSS |
| **Backend**     | Python, FastAPI            |
| **Vector DB**   | ChromaDB (`chroma/`)       |
| **Data Source** | Local PDFs (`books/`)      |

---

# 📚 VELORA — Setup Guide

## 1. Requirements

* Python 3.10+
* Node.js 18+
* [Ollama](https://ollama.com) installed locally

## 2. Clone

```bash
git clone https://github.com/Gming-1/Velora.git
cd Velora
```

## 3. Ollama

```bash
ollama serve
ollama pull llama3
ollama pull nomic-embed-text
```

## 4. Backend

```bash
cd backend
pip install -r requirements.txt
```

Add your PDFs to `backend/books/`, then build the vector DB:

```bash
python popu_db.py
```

Run the API:

```bash
python -m uvicorn app:app --reload --port 8000 
```

## 5. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`, calling `POST http://localhost:8000/api/chat` with `{"question": "..."}`.

## 6. Adding more books later

```bash
python popu_db.py           # adds new PDFs only
python popu_db.py --reset   # wipes and rebuilds the DB
```

## 📁 Project Structure

```text
Velora/
├── backend/
│   ├── books/          # Place your PDF files here
│   ├── chroma/         # Vector database storage
│   ├── app.py          # FastAPI main application
│   ├── embedding.py    # Embedding generation pipeline
│   └── popu_db.py      # Database population script
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx     # Main chat UI component
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```
