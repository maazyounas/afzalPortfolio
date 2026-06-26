"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCheck,
  ExternalLink,
  Mail,
  MailOpen,
  MessageSquareText,
  Trash2,
} from "lucide-react";

import {
  deleteContactMessage,
  markContactMessageRead,
} from "@/actions/contact";

type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

function buildGmailComposeLink(message: ContactMessage) {
  const subject = encodeURIComponent(`Re: ${message.subject || "Website inquiry"}`);
  const body = encodeURIComponent(
    `Hi ${message.name},\n\nThanks for getting in touch. I wanted to follow up on your message:\n\n"${message.message}"\n\nBest regards,`
  );
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    message.email
  )}&su=${subject}&body=${body}`;
}

export function MessagesList({ messages }: { messages: ContactMessage[] }) {
  const router = useRouter();
  const [workingId, setWorkingId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const unread = messages.filter((message) => !message.isRead).length;
    return { total: messages.length, unread };
  }, [messages]);

  async function handleToggleRead(message: ContactMessage) {
    setWorkingId(message._id);
    const result = await markContactMessageRead(message._id, !message.isRead);
    if (!result.success) {
      alert(result.error || "Failed to update message");
    } else {
      router.refresh();
    }
    setWorkingId(null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this contact message?")) return;
    setWorkingId(id);
    const result = await deleteContactMessage(id);
    if (!result.success) {
      alert(result.error || "Failed to delete message");
    } else {
      router.refresh();
    }
    setWorkingId(null);
  }

  if (messages.length === 0) {
    return (
      <div className="admin-table-wrapper">
        <div className="admin-table-empty" style={{ padding: "64px 20px" }}>
          <div className="admin-table-empty-title">No messages yet</div>
          <div className="admin-table-empty-desc" style={{ marginBottom: 20 }}>
            New contact submissions will appear here automatically.
          </div>
          <Link href="/contact" className="admin-btn admin-btn-primary admin-btn-sm">
            <MessageSquareText size={14} />
            View contact form
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="admin-card">
          <div className="admin-card-body">
            <div className="admin-stat-label">Total Messages</div>
            <div className="admin-page-title" style={{ margin: "8px 0 0" }}>
              {stats.total}
            </div>
          </div>
        </div>
        <div className="admin-card">
          <div className="admin-card-body">
            <div className="admin-stat-label">Unread</div>
            <div className="admin-page-title" style={{ margin: "8px 0 0" }}>
              {stats.unread}
            </div>
          </div>
        </div>
      </div>

      <div className="admin-table-wrapper">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => {
                const gmailLink = buildGmailComposeLink(message);
                const isBusy = workingId === message._id;
                return (
                  <tr key={message._id}>
                    <td>
                      {message.isRead ? (
                        <span className="admin-badge admin-badge-success">
                          <MailOpen size={10} />
                          Read
                        </span>
                      ) : (
                        <span className="admin-badge admin-badge-warning">
                          <Mail size={10} />
                          Unread
                        </span>
                      )}
                    </td>
                    <td style={{ color: "var(--admin-primary)", fontWeight: 600 }}>
                      {message.name}
                    </td>
                    <td style={{ color: "var(--admin-text-secondary)", fontSize: 13 }}>
                      {message.email}
                    </td>
                    <td style={{ color: "var(--admin-text-secondary)", fontSize: 13 }}>
                      {message.subject || "Website inquiry"}
                    </td>
                    <td>
                      <p
                        style={{
                          maxWidth: 360,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          color: "var(--admin-text-secondary)",
                          fontSize: 13,
                        }}
                        title={message.message}
                      >
                        {message.message}
                      </p>
                    </td>
                    <td style={{ color: "var(--admin-muted)", fontSize: 13 }}>
                      {formatDate(message.createdAt)}
                    </td>
                    <td>
                      <div className="admin-action-row">
                        <a
                          href={gmailLink}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-btn-icon"
                          title="Open in Gmail"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleToggleRead(message)}
                          className="admin-btn-icon"
                          title={message.isRead ? "Mark unread" : "Mark read"}
                          disabled={isBusy}
                        >
                          <CheckCheck size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(message._id)}
                          className="admin-btn-icon danger"
                          title="Delete"
                          disabled={isBusy}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
