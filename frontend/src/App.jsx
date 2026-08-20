import { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = input;
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: currentQuestion,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      const botMessage = {
        role: "bot",
        text: data.answer,
        sources: data.sources || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching answer:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Erreur : FASTAPI IS Sleeping !!",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 font-sans">
      
      <header className="p-4 border-b border-slate-800 bg-slate-950">
        <h1 className="text-xl font-bold text-indigo-400">
          Velora {" "}
          <span className="text-xs text-slate-500 font-normal">
            The Handy Book Assistant
          </span>
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 max-w-3xl w-full mx-auto">
        
        {messages.length === 0 && (
          <div className="text-center text-slate-500 mt-20">
            <p>Pose une question sur tes livres...</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              msg.role === "user"
                ? "items-end"
                : "items-start"
            }`}
          >
            <div
              className={`max-w-xl p-3 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-200 border border-slate-700"
              }`}
            >
              {msg.text}
            </div>

            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-1 text-xs text-slate-400">
                <span className="font-semibold text-slate-500">
                  Sources :{" "}
                </span>
                {msg.sources.join(", ")}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="text-slate-400 text-sm animate-pulse">
            Velora réfléchit...
          </div>
        )}
      </main>

      <footer className="p-4 border-t border-slate-800 bg-slate-950">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pose ta question..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-3 rounded-xl text-sm transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "Envoyer"}
          </button>
        </form>
      </footer>
    </div>
  );
}