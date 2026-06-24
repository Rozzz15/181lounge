'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#d4cfc7] overflow-hidden"
          >
            <div className="bg-[#525A40] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.jpg"
                  alt="AI Assistant"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-white/30"
                />
                <div>
                  <p className="text-white font-semibold text-sm">181 Lounge AI</p>
                  <p className="text-white/60 text-xs">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-80 p-4 overflow-y-auto bg-[#F3F0E8]/50 flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <img
                  src="/images/chat.png"
                  alt="AI"
                  className="w-7 h-7 object-contain mt-1 flex-shrink-0"
                />
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm max-w-[80%]">
                  <p className="text-sm text-[#44362A]">
                    Hello! Welcome to 181 Lounge. How can I help you today?
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-[#d4cfc7] bg-white flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 rounded-full bg-[#F3F0E8] text-sm text-[#44362A] placeholder-[#948D82] outline-none focus:ring-2 focus:ring-[#525A40]/30"
              />
              <button className="w-9 h-9 rounded-full bg-[#525A40] text-white flex items-center justify-center hover:bg-[#44362A] transition-colors flex-shrink-0">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="drop-shadow-lg flex items-center justify-center transition-shadow"
      >
        {isOpen ? (
          <span className="w-14 h-14 rounded-full bg-[#525A40] flex items-center justify-center">
            <X className="h-6 w-6 text-white" />
          </span>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-white/80 rounded-full blur-xl scale-125" />
            <div className="absolute inset-0 w-20 h-20 bg-[#525A40] rounded-full animate-ping opacity-20" />
            <img
              src="/images/chat.png"
              alt="Chat"
              className="w-20 h-20 object-contain relative drop-shadow-lg"
            />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <MessageCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-400 rounded-full animate-ping opacity-75" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
