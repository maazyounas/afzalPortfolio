export function formatError(error: unknown): string {
  // Zod validation errors are inside error.errors array
    if (error && typeof error === "object") {
      const anyErr = error as any;
      if (Array.isArray(anyErr.errors) && anyErr.errors.length > 0) {
        const first = anyErr.errors[0];
        if (typeof first.message === "string") {
          return first.message;
        }
      }
    if (typeof anyErr.message === "string") {
      return anyErr.message;
    }
  }
  return "An unexpected error occurred. Please try again later.";
}
