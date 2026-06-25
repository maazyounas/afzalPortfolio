export function formatError(error: unknown): string {
  if (error && typeof error === "object") {
    const maybeError = error as {
      errors?: Array<{ message?: unknown }>;
      message?: unknown;
    };

    if (Array.isArray(maybeError.errors) && maybeError.errors.length > 0) {
      const first = maybeError.errors[0];
      if (typeof first?.message === "string") {
        return first.message;
      }
    }

    if (typeof maybeError.message === "string") {
      return maybeError.message;
    }
  }

  return "An unexpected error occurred. Please try again later.";
}
