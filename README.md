# 📚 VELORA — The Handy Book Assistant

**VELORA** is a RAG (Retrieval-Augmented Generation) application designed to search and answer questions based on a local library of books and PDF documents using custom embeddings and vector search.

---

## 📌 Features

* 📄 **Local PDF Library:** Ingests documents directly from a local `books/` folder.
* ⚡ **FastAPI Backend:** Lightweight Python server processing vector similarity queries.
* 🔍 **Chroma Vector DB:** Persistent vector store for fast document retrieval.
* 💻 **React + Vite Interface:** Dark-themed, responsive chat application built with Tailwind CSS.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), Tailwind CSS |
| **Backend** | Python, FastAPI |
| **Vector DB** | ChromaDB (`chroma/`) |
| **Data Source** | Local PDFs (`books/`) |

---

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