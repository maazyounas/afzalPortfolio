import { NextResponse } from "next/server";
import { Resend } from "resend";

import dbConnect from "@/lib/db/db";
import ContactMessage from "@/models/ContactMessage";
import { ContactSubmissionSchema } from "@/validators/contact";

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(data: {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827">
      <h2 style="margin: 0 0 16px;">New contact message</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      ${data.company ? `<p><strong>Company:</strong> ${escapeHtml(data.company)}</p>` : ""}
      <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
      <p><strong>Message:</strong></p>
      <div style="white-space: pre-wrap; background: #f9fafb; border: 1px solid #e5e7eb; padding: 16px; border-radius: 12px;">${escapeHtml(data.message)}</div>
    </div>
  `;
}

function buildEmailText(data: {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}) {
  return [
    "New contact message",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ContactSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message || "Invalid contact form submission",
        },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || adminEmail;

    if (!recipientEmail) {
      return NextResponse.json(
        { ok: false, error: "ADMIN_EMAIL is not configured" },
        { status: 500 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const data = parsed.data;
    const subject = data.subject?.trim() || `Website inquiry from ${data.name}`;
    const company = data.company?.trim() || "";

    await resend.emails.send({
      from: "Softtech Financials <onboarding@resend.dev>",
      to: recipientEmail,
      replyTo: data.email.trim(),
      subject: `[Contact Form] ${subject}`,
      html: buildEmailHtml({
        name: data.name.trim(),
        email: data.email.trim(),
        company,
        subject,
        message: data.message.trim(),
      }),
      text: buildEmailText({
        name: data.name.trim(),
        email: data.email.trim(),
        company,
        subject,
        message: data.message.trim(),
      }),
    });

    let messageId: string | null = null;
    try {
      await dbConnect();
      const savedMessage = await ContactMessage.create({
        name: data.name.trim(),
        email: data.email.trim(),
        company: company || undefined,
        subject,
        message: data.message.trim(),
        isRead: false,
      });
      messageId = savedMessage._id.toString();
    } catch (dbError) {
      console.error("Contact message email sent, but saving to inbox failed:", dbError);
    }

    return NextResponse.json(
      {
        ok: true,
        messageId,
        storedInInbox: Boolean(messageId),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to process contact submission:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to send message right now. Please try again later." },
      { status: 500 }
    );
  }
}

