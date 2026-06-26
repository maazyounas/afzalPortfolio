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
      className="admin-btn-icon danger"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
