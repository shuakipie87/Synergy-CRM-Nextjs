import React, { useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  MOCK_CUSTOMERS,
  MOCK_MESSAGES,
  MOCK_TASKS,
  MOCK_USERS,
} from "../../../lib/mock";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/Card";
import {
  Send,
  CheckCircle2,
  Clock,
  Plus,
  Phone,
  Mail,
  MoreVertical,
  Paperclip,
} from "lucide-react";

export default function CustomerDetail() {
  const router = useRouter();
  const { id } = router.query;
  const customer = MOCK_CUSTOMERS.find((c) => c.id === id) || MOCK_CUSTOMERS[0];
  const [activeTab, setActiveTab] = useState<"chat" | "tasks" | "files">(
    "chat"
  );
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState(MOCK_MESSAGES);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      senderId: "u1", // Current user
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setChatHistory([...chatHistory, newMessage]);
    setMessage("");
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-500/25">
            {customer?.name.substring(0, 2)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
              {customer?.name}
            </h1>
            <div className="flex items-center gap-3 text-zinc-500 text-sm mt-1">
              <span className="flex items-center gap-1">
                <Mail size={14} /> {customer?.email}
              </span>
              <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
              <span className="capitalize">{customer?.status}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 text-sm font-medium hover:bg-zinc-50 transition-colors shadow-sm">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
            Create Deal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Info */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-zinc-500 mb-1">Account Owner</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-200 overflow-hidden">
                      <img
                        src={
                          MOCK_USERS.find((u) => u.id === customer?.assignedTo)
                            ?.avatarUrl
                        }
                        alt="Owner"
                      />
                    </div>
                    <span className="font-medium">
                      {
                        MOCK_USERS.find((u) => u.id === customer?.assignedTo)
                          ?.name
                      }
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-zinc-500 mb-1">Lifetime Value</p>
                  <p className="font-medium">
                    ${customer?.value.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500 mb-1">Subscription</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                    Enterprise Plan
                  </span>
                </div>
                <div>
                  <p className="text-zinc-500 mb-1">Location</p>
                  <p className="font-medium">San Francisco, CA</p>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-zinc-500 text-sm mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {customer?.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Jane Doe (CEO)", "John Smith (CTO)"].map((contact, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-medium">
                      {contact.charAt(0)}
                    </div>
                    <span className="font-medium group-hover:text-indigo-600 transition-colors">
                      {contact}
                    </span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Phone
                      size={14}
                      className="text-zinc-400 hover:text-zinc-600"
                    />
                    <Mail
                      size={14}
                      className="text-zinc-400 hover:text-zinc-600"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Interactive Area */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="h-[600px] flex flex-col">
            <div className="flex items-center px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`pb-4 -mb-4 text-sm font-medium border-b-2 transition-all ${activeTab === "chat" ? "border-indigo-600 text-indigo-600" : "border-transparent text-zinc-500 hover:text-zinc-700"}`}
                >
                  Team Chat
                </button>
                <button
                  onClick={() => setActiveTab("tasks")}
                  className={`pb-4 -mb-4 text-sm font-medium border-b-2 transition-all ${activeTab === "tasks" ? "border-indigo-600 text-indigo-600" : "border-transparent text-zinc-500 hover:text-zinc-700"}`}
                >
                  Tasks
                </button>
                <button
                  onClick={() => setActiveTab("files")}
                  className={`pb-4 -mb-4 text-sm font-medium border-b-2 transition-all ${activeTab === "files" ? "border-indigo-600 text-indigo-600" : "border-transparent text-zinc-500 hover:text-zinc-700"}`}
                >
                  Files
                </button>
              </div>
            </div>

            {activeTab === "chat" && (
              <>
                <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-zinc-50/50 dark:bg-zinc-900/20">
                  {chatHistory.map((msg) => {
                    const isMe = msg.senderId === "u1";
                    const isSystem = msg.isSystem;
                    const sender = MOCK_USERS.find(
                      (u) => u.id === msg.senderId
                    );

                    if (isSystem)
                      return (
                        <div key={msg.id} className="flex justify-center">
                          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-xs rounded-full border border-zinc-200 dark:border-zinc-700">
                            {msg.content}
                          </span>
                        </div>
                      );

                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}
                      >
                        {!isMe && (
                          <img
                            src={sender?.avatarUrl}
                            className="w-8 h-8 rounded-full bg-white"
                            alt="Sender"
                          />
                        )}
                        <div
                          className={`max-w-[70%] space-y-1 ${isMe ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`flex items-center gap-2 ${isMe ? "flex-row-reverse" : ""}`}
                          >
                            <span className="text-xs text-zinc-400">
                              {sender?.name || "You"}
                            </span>
                            <span className="text-xs text-zinc-300">
                              {msg.timestamp}
                            </span>
                          </div>
                          <div
                            className={`px-4 py-2.5 rounded-2xl text-sm ${isMe ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-tl-none"}`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                  <form onSubmit={handleSendMessage} className="flex gap-3">
                    <button
                      type="button"
                      className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                      <Paperclip size={20} />
                    </button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message or type /kb for knowledge base..."
                      className="flex-1 bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg px-4 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </>
            )}

            {activeTab === "tasks" && (
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Open Tasks</h3>
                  <button className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700">
                    <Plus size={14} /> New Task
                  </button>
                </div>
                {MOCK_TASKS.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 p-4 bg-white border border-zinc-100 rounded-xl hover:border-zinc-300 transition-all group"
                  >
                    <button className="text-zinc-300 hover:text-indigo-600">
                      <CheckCircle2 size={22} />
                    </button>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-zinc-900">
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-zinc-500 flex items-center gap-1">
                          <Clock size={12} /> {task.dueDate}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                        <div className="flex items-center gap-1 text-xs text-zinc-500">
                          <img
                            src={
                              MOCK_USERS.find((u) => u.id === task.assignedTo)
                                ?.avatarUrl
                            }
                            className="w-4 h-4 rounded-full"
                            alt="Assignee"
                          />
                          {
                            MOCK_USERS.find((u) => u.id === task.assignedTo)
                              ?.name
                          }
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${task.status === "in-progress" ? "bg-blue-100 text-blue-700" : "bg-zinc-100 text-zinc-600"}`}
                    >
                      {task.status.replace("-", " ")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
