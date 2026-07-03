import { getSettings } from "@/actions/settings";
import SettingsForm from "./SettingsForm";
import { Settings } from "lucide-react";


export const metadata = {
  title: "Settings | Softech Financials",
  description: "Settings page of Softech Financials.",
  keywords: ["portfolio", "settings", "Softech Financials"],
  alternates: {
    canonical: "/admin/settings",
  },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Settings | Softech Financials",
    description: "Settings page of Softech Financials.",
    url: "/admin/settings",
  },
};


export default async function SettingsPage() {
  const initialData = await getSettings();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Site Settings</h1>
          <p className="admin-page-subtitle">
            Manage your website's global settings, footer content, and contact information.
          </p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-body">
          <SettingsForm initialData={initialData} />
        </div>
      </div>
    </div>
  );
}
