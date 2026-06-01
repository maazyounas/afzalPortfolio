export function formatError(error: unknown): string {
  // Zod validation errors are inside error.errors array
  if (error && typeof error === "object") {
    if (Array.isArray(error.errors) && error.errors.length > 0) {
      const first = error.errors[0];
      if (typeof first.message === "string") {
        return first.message;
      }
    }
    if (typeof error.message === "string") {
      return error.message;
    }
  }
  return "An unexpected error occurred. Please try again later.";
}
