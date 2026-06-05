import { describe, it, expect } from "vitest";
import { ErrorBoundary } from "./ErrorBoundary.tsx";

describe("ErrorBoundary static methods", () => {
  it("should update state on error via getDerivedStateFromError", () => {
    const error = new Error("Sample Error");
    const result = ErrorBoundary.getDerivedStateFromError(error);
    
    expect(result.hasError).toBe(true);
    expect(result.error).toBe(error);
  });
});
