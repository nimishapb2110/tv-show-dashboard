import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useDebounce from "./useDebounce";

describe("useDebounce", () => {
  const callback = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    callback.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should call the callback after the specified delay", () => {
    const debouncedFunction = useDebounce(callback, 300);

    debouncedFunction();
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not call the callback before the delay has passed", () => {
    const debouncedFunction = useDebounce(callback, 300);

    debouncedFunction();
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);
    expect(callback).not.toHaveBeenCalled();
  });

  it("passes the correct arguments to the callback", () => {
    const debouncedFunction = useDebounce(callback, 300);

    debouncedFunction("test", 123);
    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledWith("test", 123);
  });
});
