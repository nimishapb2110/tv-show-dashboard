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

  describe("fetchShows", () => {
    it("should fetch shows successfully", async () => {
      const mockData = mockShows();
      vi.mocked(apiClient).mockResolvedValueOnce(mockData);
      const shows = await fetchShows();
      expect(shows).toEqual(mockData);
      expect(apiClient).toHaveBeenCalledWith("/shows");
      expect(apiClient).toHaveBeenCalledTimes(1);
    });

    it("should handle fetch shows error", async () => {
      vi.mocked(apiClient).mockRejectedValueOnce(new Error("Network error"));
      await expect(fetchShows()).rejects.toThrow("Network error");
    });
  });

  describe("searchShows", () => {
    it("should search shows successfully", async () => {
      const query = "mock";
      const mockData = mockShows().map((show) => ({ show }));
      vi.mocked(apiClient).mockResolvedValueOnce(mockData);
      const shows = await searchShows(query);
      expect(shows).toEqual(mockData);
      expect(apiClient).toHaveBeenCalledWith(`/search/shows?q=${query}`);
      expect(apiClient).toHaveBeenCalledTimes(1);
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
      const mockData = mockShows()[0];
      vi.mocked(apiClient).mockResolvedValueOnce(mockData);
      const show = await getShowById(id);
      expect(show).toEqual(mockData);
      expect(apiClient).toHaveBeenCalledWith(`/shows/${id}`);
      expect(apiClient).toHaveBeenCalledTimes(1);
    });

    it("should handle get show by id error", async () => {
      const id = 1;
      vi.mocked(apiClient).mockRejectedValueOnce(new Error("Network error"));
      await expect(getShowById(id)).rejects.toThrow("Network error");
    });
  });
});
