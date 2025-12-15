export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "agent";
  avatarUrl?: string;
}

export interface Organization {
  id: string;
  name: string;
  plan: "free" | "pro" | "enterprise";
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "lead" | "active" | "churned";
  value: number;
  assignedTo?: string; // User ID
  lastContact: string;
  tags: string[];
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isSystem?: boolean;
}

export interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  assignedTo: string;
  dueDate: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string; // ISO Date string
  end: string; // ISO Date string
  type: "meeting" | "call" | "deadline" | "personal";
  participants: string[]; // User IDs
}
