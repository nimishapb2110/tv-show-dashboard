import { useShowsStore } from "./shows";
import { describe, beforeEach, it, expect, vi } from "vitest";
import * as apiServices from "../api/services";
import { createPinia, setActivePinia } from "pinia";
import { mockShow, mockShows } from "../__fixtures__/shows";

vi.mock("../api/services", () => ({
  fetchShows: vi.fn(),
  searchShows: vi.fn(),
  getShowById: vi.fn()
}));

describe("useShowsStore", () => {
  let store: ReturnType<typeof useShowsStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useShowsStore();
    vi.clearAllMocks();
  });

  describe("default state", () => {
    it("has initial shows states", () => {
      expect(store.shows).toEqual([]);
      expect(store.showsLoaded).toBe(false);
      expect(store.isLoading).toBe(false);
      expect(store.error).toBeNull();
      expect(store.searchQuery).toBe("");
      expect(store.searchResults).toEqual([]);
    });
  });

  describe("fetchShows action", () => {
    it("fetches and sets shows successfully", async () => {
      vi.mocked(apiServices.fetchShows).mockResolvedValue([...mockShows()]);

      await store.fetchShows();

      expect(store.showsLoaded).toBe(true);
      expect(store.shows).toEqual([...mockShows()]);
    });

    it("sets error state if fetching shows fails", async () => {
      vi.mocked(apiServices.fetchShows).mockRejectedValue(
        new Error("Network error")
      );

      await store.fetchShows();

      expect(store.error).toBe("Failed to fetch shows!");
    });

    it("does not fetch shows again if already loaded", async () => {
      store.showsLoaded = true;

      await store.fetchShows();

      expect(apiServices.fetchShows).not.toHaveBeenCalled();
    });
  });

  describe("searchShows action", () => {
    it("clears search results when query is empty", async () => {
      store.searchResults = [mockShow()];

      await store.searchShows("   ");

      expect(store.searchResults).toEqual([]);
    });

    it("searches and sets shows successfully", async () => {
      vi.mocked(apiServices.searchShows).mockResolvedValue([
        {
          score: 1,
          show: mockShow()
        }
      ]);

      await store.searchShows("mock");

      expect(store.searchResults).toEqual([mockShow()]);
    });

    it("adds searched shows to main shows list if not already present", async () => {
      const newSearchedShow = mockShow({ id: 123, name: "New Show" });
      vi.mocked(apiServices.fetchShows).mockResolvedValue([...mockShows()]);
      vi.mocked(apiServices.searchShows).mockResolvedValue([
        { score: 0.9, show: newSearchedShow }
      ]);
      await store.fetchShows();

      const initialCount = store.shows.length;

      await store.searchShows("new show");

      expect(store.shows.length).toBe(initialCount + 1);
      expect(store.shows.find((s) => s.id === 123)).toBeDefined();
    });

    it("does not add searched shows to main shows list if already present", async () => {
      const existingShow = mockShow({ id: 123 });
      store.shows = [existingShow];

      vi.mocked(apiServices.searchShows).mockResolvedValue([
        { score: 0.9, show: existingShow }
      ]);

      await store.searchShows("mock");

      expect(store.shows.filter((s) => s.id === 123)).toHaveLength(1);
    });

    it("sets error state if searching shows fails", async () => {
      vi.mocked(apiServices.searchShows).mockRejectedValue(
        new Error("Network error")
      );

      await store.searchShows("mock");

      expect(store.error).toBe("Failed to search shows!");
    });
  });

  describe("getShowById action", () => {
    it("fetches and adds show to state if not already present", async () => {
      const show = mockShow({ id: 123 });
      vi.mocked(apiServices.getShowById).mockResolvedValue(show);

      await store.getShowById(123);

      expect(store.shows).toContainEqual(show);
    });

    it("does not fetch if show already exists in state", async () => {
      const show = mockShow({ id: 123 });
      store.shows = [show];

      await store.getShowById(123);

      expect(apiServices.getShowById).not.toHaveBeenCalled();
    });

    it("sets error state if fetching show fails", async () => {
      vi.mocked(apiServices.getShowById).mockRejectedValue(
        new Error("Network error")
      );

      await store.getShowById(123);

      expect(store.error).toBe("Failed to fetch show!");
    });
  });

  describe("clearSearch action", () => {
    it("resets searchQuery and searchResults", () => {
      store.searchQuery = "mock";
      store.searchResults = [mockShow()];

      store.clearSearch();

      expect(store.searchQuery).toBe("");
      expect(store.searchResults).toEqual([]);
    });
  });

  describe("isSearchMode getter", () => {
    it("returns true when searchQuery is not empty", () => {
      store.searchQuery = "mock";
      expect(store.isSearchMode).toBe(true);
    });

    it("returns false when searchQuery is empty", () => {
      store.searchQuery = "   ";
      expect(store.isSearchMode).toBe(false);
    });
  });

  describe("showsByGenre getter", () => {
    it("groups shows by genre correctly", async () => {
      vi.mocked(apiServices.fetchShows).mockResolvedValue([...mockShows()]);

      await store.fetchShows();

      const grouped = store.showsByGenre;

      expect(grouped).toHaveProperty("Drama");
      expect(grouped).toHaveProperty("Comedy");
      expect(grouped).toHaveProperty("Thriller");
      expect(grouped.Drama).toHaveLength(2);
      expect(grouped.Comedy).toHaveLength(1);
      expect(grouped.Thriller).toHaveLength(1);
    });

    it("returns empty object when there are no shows", () => {
      const grouped = store.showsByGenre;
      expect(grouped).toEqual({});
    });

    it("sorts shows within each genre by rating in descending order", async () => {
      vi.mocked(apiServices.fetchShows).mockResolvedValue([...mockShows()]);

      await store.fetchShows();

      const dramaShows = store.showsByGenre["Drama"];

      expect(dramaShows).toBeDefined();
      expect(dramaShows![0]?.rating.average).toBe(8.5);
      expect(dramaShows![1]?.rating.average).toBe(7.0);
    });
  });

  describe("genres getter", () => {
    it("returns unique sorted list of genres", async () => {
      vi.mocked(apiServices.fetchShows).mockResolvedValue([...mockShows()]);

      await store.fetchShows();

      const genres = store.genres;

      expect(genres).toEqual(["Comedy", "Drama", "Thriller"]);
    });

    it("returns empty array when there are no shows", () => {
      const genres = store.genres;
      expect(genres).toEqual([]);
    });
  });
});
