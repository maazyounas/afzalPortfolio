[{
  "resource": "/c:/Users/hp/Documents/afzalPortfolio/components/sections/Hero.tsx",
  "owner": "typescript",
  "code": "2307",
  "severity": 8,
  "message": "Cannot find module '@/components/ui/Button' or its corresponding type declarations.",
  "source": "ts",
  "startLineNumber": 1,
  "startColumn": 24,
  "endLineNumber": 1,
  "endColumn": 48,
  "origin": "extHost1"
}, {
  "resource": "/c:/Users/hp/Documents/afzalPortfolio/components/sections/Hero.tsx",
  "owner": "typescript",
  "code": "2307",
  "severity": 8,
  "message": "Cannot find module '@/lib/data/site-config' or its corresponding type declarations.",
  "source": "ts",
  "startLineNumber": 2,
  "startColumn": 28,
  "endLineNumber": 2,
  "endColumn": 52,
  "origin": "extHost1"
}, {
  "resource": "/c:/Users/hp/Documents/afzalPortfolio/src/app/admin/services/page.tsx",
  "owner": "typescript",
  "code": "2322",
  "severity": 8,
  "message": "Type 'ObjectId' is not assignable to type 'Key | null | undefined'.",
  "source": "ts",
  "startLineNumber": 41,
  "startColumn": 21,
  "endLineNumber": 41,
  "endColumn": 24,
  "relatedInformation": [
    {
      "startLineNumber": 259,
      "startColumn": 9,
      "endLineNumber": 259,
      "endColumn": 12,
      "message": "The expected type comes from property 'key' which is declared here on type 'DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>'",
      "resource": "/c:/Users/hp/Documents/afzalPortfolio/node_modules/@types/react/index.d.ts"
    }
  ],
  "origin": "extHost1"
}, {
  "resource": "/c:/Users/hp/Documents/afzalPortfolio/src/app/sitemap.ts",
  "owner": "typescript",
  "code": "2339",
  "severity": 8,
  "message": "Property 'updatedAt' does not exist on type 'IBlogPost'.",
  "source": "ts",
  "startLineNumber": 20,
  "startColumn": 33,
  "endLineNumber": 20,
  "endColumn": 42,
  "origin": "extHost1"
}, {
  "resource": "/c:/Users/hp/Documents/afzalPortfolio/src/app/sitemap.ts",
  "owner": "typescript",
  "code": "2339",
  "severity": 8,
  "message": "Property 'createdAt' does not exist on type 'IBlogPost'.",
  "source": "ts",
  "startLineNumber": 20,
  "startColumn": 51,
  "endLineNumber": 20,
  "endColumn": 60,
  "origin": "extHost1"
}, {
  "resource": "/c:/Users/hp/Documents/afzalPortfolio/src/components/seo/JsonLd.tsx",
  "owner": "eslint2",
  "code": {
    "value": "@typescript-eslint/no-explicit-any",
    "target": {
      "$mid": 1,
      "path": "/rules/no-explicit-any",
      "scheme": "https",
      "authority": "typescript-eslint.io"
    }
  },
  "severity": 8,
  "message": "Unexpected any. Specify a different type.",
  "source": "eslint",
  "startLineNumber": 1,
  "startColumn": 65,
  "endLineNumber": 1,
  "endColumn": 68,
  "origin": "extHost1"
}, {
  "resource": "/c:/Users/hp/Documents/afzalPortfolio/src/features/admin/components/ServiceForm.tsx",
  "owner": "typescript",
  "code": "2322",
  "severity": 8,
  "message": "Type 'Resolver<{ name: string; slug: string; description: string; icon?: string | undefined; order?: number | undefined; isActive?: boolean | undefined; }, any, { name: string; slug: string; description: string; order: number; isActive: boolean; icon?: string | undefined; }>' is not assignable to type 'Resolver<{ name: string; slug: string; description: string; order: number; isActive: boolean; icon?: string | undefined; }, any, { name: string; slug: string; description: string; order: number; isActive: boolean; icon?: string | undefined; }>'.\n  Types of parameters 'options' and 'options' are incompatible.\n    Type 'ResolverOptions<{ name: string; slug: string; description: string; order: number; isActive: boolean; icon?: string | undefined; }>' is not assignable to type 'ResolverOptions<{ name: string; slug: string; description: string; icon?: string | undefined; order?: number | undefined; isActive?: boolean | undefined; }>'.\n      Type 'number | undefined' is not assignable to type 'number'.\n        Type 'undefined' is not assignable to type 'number'.",
  "source": "ts",
  "startLineNumber": 25,
  "startColumn": 5,
  "endLineNumber": 25,
  "endColumn": 13,
  "origin": "extHost1"
}, {
  "resource": "/c:/Users/hp/Documents/afzalPortfolio/src/features/admin/components/ServiceForm.tsx",
  "owner": "typescript",
  "code": "2345",
  "severity": 8,
  "message": "Argument of type 'ObjectId' is not assignable to parameter of type 'string'.",
  "source": "ts",
  "startLineNumber": 40,
  "startColumn": 36,
  "endLineNumber": 40,
  "endColumn": 51,
  "origin": "extHost1"
}, {
  "resource": "/c:/Users/hp/Documents/afzalPortfolio/src/features/admin/components/ServiceForm.tsx",
  "owner": "typescript",
  "code": "2345",
  "severity": 8,
  "message": "Argument of type '(data: { name: string; slug: string; description: string; order: number; isActive: boolean; icon?: string | undefined; }) => Promise<void>' is not assignable to parameter of type 'SubmitHandler<TFieldValues>'.\n  Types of parameters 'data' and 'data' are incompatible.\n    Type 'TFieldValues' is not assignable to type '{ name: string; slug: string; description: string; order: number; isActive: boolean; icon?: string | undefined; }'.\n      Type 'FieldValues' is missing the following properties from type '{ name: string; slug: string; description: string; order: number; isActive: boolean; icon?: string | undefined; }': name, slug, description, order, isActive",
  "source": "ts",
  "startLineNumber": 55,
  "startColumn": 34,
  "endLineNumber": 55,
  "endColumn": 42,
  "origin": "extHost1"
}]import { ServiceForm } from "@/features/admin/components/ServiceForm";
import dbConnect from "@/lib/db/db";
import Service from "@/models/Service";
import { notFound } from "next/navigation";

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  await dbConnect();
  const service = await Service.findById(params.id);

  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Edit Service</h1>
        <p className="text-sm text-neutral-400">Update the details for &quot;{service.name}&quot;.</p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
        <ServiceForm initialData={JSON.parse(JSON.stringify(service))} />
      </div>
    </div>
  );
}
