import { ServiceForm } from "@/features/admin/components/ServiceForm";


export const metadata = {
  title: "New | Softtech Financials",
  description: "New page of Softtech Financials.",
  keywords: ["portfolio", "new", "Softtech Financials"],
  alternates: {
    canonical: "/admin/services/new",
  },
  openGraph: {
    images: ["/opengraph-image"],
    title: "New | Softtech Financials",
    description: "New page of Softtech Financials.",
    url: "/admin/services/new",
  },
};


export default function NewServicePage() {
  return (
    <div className="max-w-2xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Add New Service</h1>
        <p className="text-sm text-neutral-400">Create a new service offering for your portfolio.</p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-5 sm:p-8">
        <ServiceForm />
      </div>
    </div>
  );
}

