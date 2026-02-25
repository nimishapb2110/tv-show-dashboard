import { describe, expect, it, vi } from "vitest";
import useHorizontalScroll from "./useHorizontalScroll";

describe("useHorizontalScroll", () => {
  it("scrolls left and right correctly", () => {
    const rowRef = { value: null };
    const { canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
      useHorizontalScroll(rowRef as any);

    rowRef.value = {
      scrollBy: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      scrollLeft: 0,
      scrollWidth: 1000,
      clientWidth: 400
    } as any;

    expect(canScrollLeft.value).toBe(false);
    expect(canScrollRight.value).toBe(false);

    scrollRight();
    expect((rowRef.value as any).scrollBy).toHaveBeenCalledWith({
      left: 400,
      behavior: "smooth"
    });

    scrollLeft();
    expect((rowRef.value as any).scrollBy).toHaveBeenCalledWith({
      left: -400,
      behavior: "smooth"
    });
  });
});
