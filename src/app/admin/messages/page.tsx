import { getContactMessages } from "@/actions/contact";
import { MessagesList } from "./MessagesList";


export const metadata = {
  title: "Messages | Softtech Financials",
  description: "Messages page of Softtech Financials.",
  keywords: ["portfolio", "messages", "Softtech Financials"],
  alternates: {
    canonical: "/admin/messages",
  },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Messages | Softtech Financials",
    description: "Messages page of Softtech Financials.",
    url: "/admin/messages",
  },
};


export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Messages</h1>
          <p className="admin-page-subtitle">
            Review website contact submissions and open them directly in Gmail when you need to reply.
          </p>
        </div>
      </div>

      <MessagesList messages={messages} />
    </div>
  );
}

