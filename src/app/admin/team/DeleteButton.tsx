"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("Are you sure you want to delete this team member?")) {
          e.preventDefault();
        }
      }}
      className="rounded-lg p-2 text-neutral-400 transition-all hover:bg-red-400/10 hover:text-red-400"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
