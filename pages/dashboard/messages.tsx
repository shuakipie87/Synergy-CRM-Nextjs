import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { MOCK_USERS, MOCK_MESSAGES } from "../../lib/mock";
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Send,
  Image as ImageIcon,
} from "lucide-react";

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState("u2");

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-140px)] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm flex overflow-hidden">
        {/* Sidebar List */}
        <div className="w-80 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {MOCK_USERS.slice(1).map((user) => (
              <button
                key={user.id}
                onClick={() => setActiveChat(user.id)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left border-l-4 ${activeChat === user.id ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10" : "border-transparent"}`}
              >
                <div className="relative">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-10 h-10 rounded-full bg-zinc-200"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span
                      className={`font-medium truncate ${activeChat === user.id ? "text-indigo-900 dark:text-indigo-100" : "text-zinc-900 dark:text-zinc-100"}`}
                    >
                      {user.name}
                    </span>
                    <span className="text-xs text-zinc-400">10:42 AM</span>
                  </div>
                  <p className="text-sm text-zinc-500 truncate">
                    Hey, did you see the new lead from Acme?
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-zinc-50/30 dark:bg-zinc-950">
          {/* Chat Header */}
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={MOCK_USERS.find((u) => u.id === activeChat)?.avatarUrl}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white">
                  {MOCK_USERS.find((u) => u.id === activeChat)?.name}
                </h3>
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>{" "}
                  Active now
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
                <Phone size={20} />
              </button>
              <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
                <Video size={20} />
              </button>
              <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex justify-center">
              <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                Today, October 24
              </span>
            </div>
            {MOCK_MESSAGES.filter((m) => !m.isSystem).map((msg, i) => {
              const isMe = msg.senderId === "u1";
              return (
                <div
                  key={i}
                  className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}
                >
                  {!isMe && (
                    <img
                      src={
                        MOCK_USERS.find((u) => u.id === activeChat)?.avatarUrl
                      }
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div
                    className={`max-w-[60%] space-y-1 ${isMe ? "items-end flex flex-col" : ""}`}
                  >
                    <div
                      className={`p-4 rounded-2xl text-sm ${isMe ? "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-500/10" : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-tl-none shadow-sm"}`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-xs text-zinc-400 block px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-end gap-2 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-xl">
              <button className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                <Paperclip size={20} />
              </button>
              <button className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                <ImageIcon size={20} />
              </button>
              <textarea
                className="flex-1 bg-transparent border-none focus:ring-0 outline-none resize-none py-2 max-h-32 text-sm"
                placeholder="Type your message..."
                rows={1}
              />
              <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition-all active:scale-95">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
