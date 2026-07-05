"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AI_RESPONSES, AI_KEYWORD_MAP } from "@/data/culturalData";
import { Bot, User, Send, Compass, MessageSquare, AlertCircle } from "lucide-react";

interface Message {
  sender: "user" | "ai";
  text: string;
}

export default function AIChat() {
  const { currentLang, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        sender: "ai",
        text: t("chat-welcome"),
      },
    ]);
  }, [currentLang]);

  // Scroll to bottom when messages or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Suggestion chips keys list
  const chips = [
    { key: "wayang", label: t("chip-wayang") },
    { key: "bahasa", label: t("chip-bahasa") },
    { key: "candi", label: t("chip-candi") },
  ];

  const matchAITopic = (rawInput: string): string | null => {
    const text = rawInput.toLowerCase();
    for (const [key, keywords] of Object.entries(AI_KEYWORD_MAP)) {
      if (keywords.some((kw) => text.includes(kw))) return key;
    }
    return null;
  };

  const handleSendMessage = (textToSend: string, presetKey: string | null = null) => {
    if (!textToSend.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: textToSend } as Message];
    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    // AI response simulation
    setTimeout(() => {
      let aiResponseText = "";
      
      if (presetKey && presetKey in AI_RESPONSES) {
        const responseData = AI_RESPONSES[presetKey];
        aiResponseText = currentLang === "id" ? responseData.id_ai : responseData.en_ai;
      } else {
        const matchedKey = matchAITopic(textToSend);
        if (matchedKey && matchedKey in AI_RESPONSES) {
          const responseData = AI_RESPONSES[matchedKey];
          aiResponseText = currentLang === "id" ? responseData.id_ai : responseData.en_ai;
        } else {
          // Default fallback response
          aiResponseText =
            currentLang === "id"
              ? "Maaf, saya belum memahami topik tersebut. Silakan tanyakan tentang Wayang, Bahasa Daerah, Candi Borobudur, Kerajaan Majapahit, Batik, Suku Adat, atau Sejarah Kemerdekaan Indonesia!"
              : "I apologize, but I did not catch that. Please ask about Wayang, Endangered Languages, Candi Borobudur, Majapahit Empire, Batik, Native Tribes, or Indonesian Independence!";
        }
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponseText }]);
    }, 1000);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleSendMessage(inputValue);
  };

  return (
    <section id="ai-guide" className="ai-section section-padding reveal">
      <div className="container">
        <div className="ai-grid">
          
          <div>
            <div className="eyebrow-chip eyebrow-chip-cyan">
              <Bot size={14} />
              <span>{t("ai-eyebrow")}</span>
            </div>
            <h2 className="section-title">
              {t("ai-title-1")}
              <br />
              <span className="text-gradient-cyan">{t("ai-title-2")}</span>
            </h2>
            <p className="section-subtitle">
              {t("ai-subtitle")}
            </p>

            <div className="ai-features-column">
              <div className="ai-feature-box">
                <div className="ai-feature-icon">
                  <Compass size={20} />
                </div>
                <div>
                  <h4 className="ai-feature-title">{t("ai-feat-1")}</h4>
                  <p className="ai-feature-desc">{t("ai-feat-1-desc")}</p>
                </div>
              </div>

              <div className="ai-feature-box">
                <div className="ai-feature-icon">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="ai-feature-title">{t("ai-feat-2")}</h4>
                  <p className="ai-feature-desc">{t("ai-feat-2-desc")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI Chat Simulator Box */}
          <div className="ai-chat-interface glass-card">
            
            {/* Simulator Header */}
            <div className="ai-chat-header">
              <div className="ai-avatar-box">
                <img
                  className="ai-avatar-img"
                  src="https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=150&q=80"
                  alt="Nusa AI"
                  loading="lazy"
                />
                <div className="ai-status-indicator"></div>
              </div>
              <div className="ai-chat-info">
                <span className="ai-chat-name">NUSA AI</span>
                <span className="ai-chat-status">
                  {t("ai-status")}
                </span>
              </div>
            </div>

            {/* Messages box list wrapper */}
            <div className="ai-chat-messages-box" id="chat-messages-box">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`msg-bubble ${msg.sender === "ai" ? "ai" : "user"}`}
                >
                  {msg.text}
                </div>
              ))}

              {/* Typing indicator bubble */}
              {isTyping && (
                <div className="msg-bubble ai" style={{ display: "flex", alignItems: "center" }}>
                  <div className="inline-flex items-center gap-1 px-2 py-1" style={{ display: "flex", gap: "4px" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-typing-1"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-typing-2"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-typing-3"></span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            <div className="ai-chat-chips-row">
              {chips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={() => handleSendMessage(chip.label, chip.key)}
                  disabled={isTyping}
                  className="chat-suggestion-chip"
                  style={{ border: "none", cursor: "pointer" }}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input form panel bar */}
            <form onSubmit={handleSubmitForm} className="ai-chat-input-bar">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
                placeholder={currentLang === "id" ? "Tanyakan sesuatu pada Nusa..." : "Ask Nusa anything..."}
                className="ai-chat-input"
                id="chat-input-field"
              />
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                className="ai-chat-send-btn"
                id="chat-send-btn"
                aria-label="Kirim pesan"
              >
                <Send size={16} />
              </button>
            </form>

          </div>

        </div>
      </div>
    </section>
  );
}
