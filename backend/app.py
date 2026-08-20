from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_chroma import Chroma
from embedding import get_embedding_function
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import OllamaLLM

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """ Answer to the question based on the context only :

{context} 

---

Question : {question}
Answer : 
"""

app = FastAPI(title="Velora RAG API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    question: str

@app.post("/api/chat")
def chat_endpoint(request: QueryRequest):
    query_text = request.question

    # Load the Chroma database and perform a similarity search
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)
    results = db.similarity_search_with_score(query_text, k=5)

    # Assemble the context from the retrieved documents
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    message = prompt_template.format(context=context_text, question=query_text)

    # call the Ollama LLM to generate a response based on the context and question
    model = OllamaLLM(model="llama3")
    response_text = model.invoke(message)

    # extraction of sources from the retrieved documents
    sources = [doc.metadata.get("id",None) for doc, _score in results]

    # Return the response and sources as a JSON object
    return {
        "answer": response_text,
        "sources": sources
        }
