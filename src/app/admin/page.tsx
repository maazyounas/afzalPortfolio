import { 
  Briefcase, 
  Users, 
  MessageSquare, 
  FileText 
} from "lucide-react";
import dbConnect from "@/lib/db/db";
import Service from "@/models/Service";
import TeamMember from "@/models/TeamMember";
import BlogPost from "@/models/BlogPost";
import ContactMessage from "@/models/ContactMessage";

export default async function AdminDashboard() {
  await dbConnect();

  const [services, team, blogs, messages] = await Promise.all([
    Service.countDocuments(),
    TeamMember.countDocuments(),
    BlogPost.countDocuments(),
    ContactMessage.countDocuments({ isRead: false }),
  ]);

  const stats = [
    { label: "Services", value: services, icon: Briefcase, color: "text-blue-400" },
    { label: "Team Members", value: team, icon: Users, color: "text-green-400" },
    { label: "Blog Posts", value: blogs, icon: FileText, color: "text-purple-400" },
    { label: "Unread Messages", value: messages, icon: MessageSquare, color: "text-orange-400" },
  ];

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="mt-2 text-neutral-400">Welcome back. Here is what is happening with your portfolio.</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:border-white/10">
            <div className="flex items-center gap-4">
              <div className={`rounded-lg bg-white/5 p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="rounded-xl bg-white/5 p-4 text-sm font-medium transition-all hover:bg-white/10">
              New Blog Post
            </button>
            <button className="rounded-xl bg-white/5 p-4 text-sm font-medium transition-all hover:bg-white/10">
              Add Service
            </button>
            <button className="rounded-xl bg-white/5 p-4 text-sm font-medium transition-all hover:bg-white/10">
              Update Team
            </button>
            <button className="rounded-xl bg-white/5 p-4 text-sm font-medium transition-all hover:bg-white/10">
              Site Settings
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
          <h2 className="text-xl font-semibold">Recent Messages</h2>
          <div className="mt-6 space-y-4">
            <p className="text-sm text-neutral-500 italic">No new messages in the last 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
