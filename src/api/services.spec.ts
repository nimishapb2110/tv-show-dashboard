import { beforeEach, describe, expect, it, vi } from "vitest";
import apiClient from "./client";
import { mockShows } from "../__fixtures__/shows";
import { fetchShows, searchShows, getShowById } from "./services";

vi.mock("./client", () => ({
  default: vi.fn()
}));

describe("api services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have fetchShows function", async () => {
    const { fetchShows } = await import("./services");
    expect(fetchShows).toBeDefined();
  });

  it("should have searchShows function", async () => {
    const { searchShows } = await import("./services");
    expect(searchShows).toBeDefined();
  });

  it("should have getShowById function", async () => {
    const { getShowById } = await import("./services");
    expect(getShowById).toBeDefined();
  });

  describe("fetchShows", () => {
    it("should fetch shows successfully", async () => {
      vi.mocked(apiClient).mockResolvedValueOnce(mockShows());
      const shows = await fetchShows();
      expect(shows).toEqual(mockShows());
      expect(apiClient).toHaveBeenCalledWith("/shows");
    });

    it("should handle fetch shows error", async () => {
      vi.mocked(apiClient).mockRejectedValueOnce(new Error("Network error"));
      await expect(fetchShows()).rejects.toThrow("Network error");
    });
  });

  describe("searchShows", () => {
    it("should search shows successfully", async () => {
      const query = "mock";
      vi.mocked(apiClient).mockResolvedValueOnce(mockShows());
      const shows = await searchShows(query);
      expect(shows).toEqual(mockShows());
      expect(apiClient).toHaveBeenCalledWith(`/search/shows?q=${query}`);
    });

    it("should handle search shows error", async () => {
      const query = "mock";
      vi.mocked(apiClient).mockRejectedValueOnce(new Error("Network error"));
      await expect(searchShows(query)).rejects.toThrow("Network error");
    });
  });

  describe("getShowById", () => {
    it("should get show by id successfully", async () => {
      const id = 1;
      vi.mocked(apiClient).mockResolvedValueOnce(mockShows()[0]);
      const show = await getShowById(id);
      expect(show).toEqual(mockShows()[0]);
      expect(apiClient).toHaveBeenCalledWith(`/shows/${id}`);
    });

    it("should handle get show by id error", async () => {
      const id = 1;
      vi.mocked(apiClient).mockRejectedValueOnce(new Error("Network error"));
      await expect(getShowById(id)).rejects.toThrow("Network error");
    });
  });
});
