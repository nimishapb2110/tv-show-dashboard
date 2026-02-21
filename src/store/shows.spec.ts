import { describe, beforeEach, it, expect, vi } from "vitest";
import { useShowsStore } from "./shows";
import * as apiServices from "../api/services";
import { createPinia, setActivePinia } from "pinia";

vi.mock("../api/services", () => ({
  fetchShows: vi.fn(),
  searchShows: vi.fn(),
  getShowById: vi.fn(),
}));

describe("Shows Store", () => {
  let store: ReturnType<typeof useShowsStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useShowsStore();
    vi.clearAllMocks();
  });

  it("fetches shows and updates state", async () => {
    vi.mocked(apiServices.fetchShows).mockResolvedValueOnce([]);
    await store.fetchShows();
    expect(store.shows).toEqual([]);
  });
});
