import { describe, it, expect } from "vitest";

describe("Demo Application Tests", () => {
  it("should verify basic math", () => {
    expect(1 + 1).toBe(2);
  });

  it("should assert product schema capabilities", () => {
    const product = {
      name: "Honey",
      price: 150,
      category: "Pure Honey"
    };
    expect(product.name).toBe("Honey");
    expect(product.price).toBeGreaterThan(0);
  });
});
