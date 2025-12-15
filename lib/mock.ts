import { Customer, Message, Task, User, CalendarEvent } from "./types";

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "Alex Rivera",
    email: "alex@synergy.com",
    role: "manager",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    id: "u2",
    name: "Sarah Chen",
    email: "sarah@synergy.com",
    role: "agent",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "u3",
    name: "Jordan Lee",
    email: "jordan@synergy.com",
    role: "agent",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "c1",
    name: "Acme Corp",
    company: "Acme Inc.",
    email: "contact@acme.com",
    status: "active",
    value: 12000,
    assignedTo: "u1",
    lastContact: "2h ago",
    tags: ["Enterprise", "High Priority"],
  },
  {
    id: "c2",
    name: "Globex Designs",
    company: "Globex",
    email: "info@globex.com",
    status: "lead",
    value: 4500,
    assignedTo: "u2",
    lastContact: "1d ago",
    tags: ["SaaS", "Warm"],
  },
  {
    id: "c3",
    name: "Soylent Corp",
    company: "Soylent",
    email: "sales@soylent.com",
    status: "churned",
    value: 0,
    assignedTo: "u3",
    lastContact: "30d ago",
    tags: ["Retail"],
  },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: "m1",
    senderId: "u1",
    content: "Checking in on the renewal contract.",
    timestamp: "10:00 AM",
  },
  {
    id: "m2",
    senderId: "u2",
    content: "They asked for a 5% discount. Thoughts?",
    timestamp: "10:05 AM",
  },
  {
    id: "m3",
    senderId: "system",
    content: 'Task "Prepare Contract" assigned to Sarah Chen',
    timestamp: "10:06 AM",
    isSystem: true,
  },
];

export const MOCK_TASKS: Task[] = [
  {
    id: "t1",
    title: "Prepare Contract",
    status: "in-progress",
    assignedTo: "u2",
    dueDate: "Tomorrow",
  },
  {
    id: "t2",
    title: "Schedule Demo",
    status: "todo",
    assignedTo: "u1",
    dueDate: "Next Week",
  },
];

// Generate some dates relative to today for the calendar
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: "e1",
    title: "Q4 Strategy Meeting",
    description: "Discussing Q4 targets and roadmap.",
    start: today.toISOString(),
    end: new Date(today.setHours(today.getHours() + 1)).toISOString(),
    type: "meeting",
    participants: ["u1", "u2", "u3"],
  },
  {
    id: "e2",
    title: "Client Demo: Acme Corp",
    description: "Showcasing the new dashboard features.",
    start: tomorrow.toISOString(),
    end: new Date(tomorrow.setHours(tomorrow.getHours() + 1)).toISOString(),
    type: "call",
    participants: ["u1", "u2"],
  },
  {
    id: "e3",
    title: "Project Deadline",
    start: nextWeek.toISOString(),
    end: nextWeek.toISOString(),
    type: "deadline",
    participants: ["u1"],
  },
];
