"use client";

import { useState } from "react";
import ReactMarkdown from 'react-markdown';

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  time: string;
};

// Ajout des types pour le RAG
type Source = {
  title: string;
  chunk: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Salut 👋 Je suis RAG Assistant Cree par Abdelilah Ourti . Je peux vous aider avec vos questions sur vos Document (Text,PDF,DOC,JSON ....)",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [indexing, setIndexing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  // Fonction pour indexer les documents
  async function handleIndex() {
    setIndexing(true);
    try {
      const response = await fetch("http://localhost:8000/index", {
        method: "POST",
      });
      if (!response.ok) throw new Error("Indexation failed");
      setUploadProgress("Indexation réussie!");
    } catch (error) {
      setUploadProgress("Erreur lors de l'indexation");
      console.error("Indexation error:", error);
    } finally {
      setIndexing(false);
      setTimeout(() => setUploadProgress(null), 3000);
    }
  }

  // Fonction pour uploader un fichier
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploadProgress("Upload en cours...");

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      setUploadProgress("Upload réussi!");
    } catch (error) {
      setUploadProgress("Erreur lors de l'upload");
      console.error("Upload error:", error);
    }
    setTimeout(() => setUploadProgress(null), 3000);
  }

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMsg.content }),
      });

      if (!response.ok) throw new Error("Failed to get answer");

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: data.answer,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Error:", err);
      const errorMsg: ChatMessage = {
        role: "assistant",
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-200">
        {/* HEADER BRAND */}
        <header className="flex items-start justify-between p-4 bg-white border-b border-gray-200">
          {/* Bloc gauche : logo + textes */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-semibold shadow">
              RA
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  RAG Assistant
                </span>
              </div>
              <span className="text-[11px] text-gray-500 leading-snug">
                PDF · DOCX · TXT · JSON
              </span>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.docx,.txt"
            />
            <label
              htmlFor="fileUpload"
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full cursor-pointer transition-colors duration-200"
            >
              📄 Upload
            </label>
            <button
              onClick={handleIndex}
              disabled={indexing}
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200 disabled:opacity-50"
            >
              {indexing ? "⏳ Indexation..." : "🔄 Indexer"}
            </button>
          </div>
        </header>

        {/* Message de progression */}
        {uploadProgress && (
          <div className="p-2 text-center text-sm bg-blue-50 text-blue-700">
            {uploadProgress}
          </div>
        )}

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* avatar assistant côté gauche */}
              {msg.role === "assistant" && (
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white flex items-center justify-center text-[10px] font-semibold mr-3 shadow">
                  RA
                </div>
              )}

              {/* bubble + time */}
              <div className="max-w-[70%]">
                <div
                  className={`px-4 py-2 rounded-xl shadow-md text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-700 rounded-bl-none border border-gray-200"
                  }`}
                >
                  <ReactMarkdown className="prose prose-sm max-w-none">
                    {msg.content}
                  </ReactMarkdown>
                </div>

                <div
                  className={`text-[11px] mt-2 text-gray-400 ${
                    msg.role === "user"
                      ? "text-right pr-1"
                      : "text-left pl-1"
                  }`}
                >
                  {msg.time}
                </div>
              </div>

              {/* avatar user côté droit */}
              {msg.role === "user" && (
                <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[10px] font-semibold ml-3 shadow">
                  YOU
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-end justify-start">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white flex items-center justify-center text-[10px] font-semibold mr-3 shadow">
                RA
              </div>
              <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-xl shadow-md text-sm italic border border-gray-200 rounded-bl-none">
                ...je recherche dans la base de connaissances
              </div>
            </div>
          )}
        </div>

        {/* INPUT BAR */}
        <footer className="border-t border-gray-200 bg-gray-50 p-4 flex items-center gap-3">
          <input
            type="text"
            placeholder="Décris ton besoin. Exemple:'donner l'information à partir de document'"
            className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <button
            onClick={handleSend}
            disabled={loading || input.trim() === ""}
            className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white px-4 py-2 rounded-full shadow hover:opacity-90 disabled:opacity-50 transition text-sm"
          >
            ➤
          </button>
        </footer>
      </div>
    </div>
  );
}
