import { defineStore } from "pinia";
import type { Show, ShowsByGenre } from "../types/show";
import { fetchShows, getShowById, searchShows } from "../api/services";

export const useShowsStore = defineStore("shows", {
  state: () => ({
    shows: [] as Show[],
    showsLoaded: false,
    isLoading: false,
    error: null as string | null,
    searchQuery: "",
    searchResults: [] as Show[],
  }),
  getters: {
    showsByGenre: (state): ShowsByGenre => {
      const map: ShowsByGenre = {};

      for (const show of state.shows) {
        for (const genre of show.genres) {
          if (!map[genre]) map[genre] = [];
          map[genre].push(show);
        }
      }

      for (const genre in map) {
        if (map[genre]) {
          map[genre].sort(
            (a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0),
          );
        }
      }

      return map;
    },

    genres: (state): string[] => {
      const all = state.shows.flatMap((show) => show.genres);
      return [...new Set(all)].sort();
    },

    isSearchMode: (state): boolean => state.searchQuery.trim().length > 0,
  },
  actions: {
    async fetchShows() {
      if (this.showsLoaded) return;

      this.isLoading = true;
      this.error = null;
      try {
        this.shows = await fetchShows();
        this.showsLoaded = true;
      } catch (error) {
        this.error = "Failed to fetch shows";
      } finally {
        this.isLoading = false;
      }
    },
    async searchShows(query: string) {
      if (query.trim() === "") {
        this.clearSearch();
        return;
      }

      this.searchQuery = query;
      this.isLoading = true;
      this.error = null;

      try {
        const results = await searchShows(query);

        const shows = results.map((result) => result.show);

        this.searchResults = shows;

        for (const show of shows) {
          if (!this.shows.find((s) => s.id === show.id)) {
            this.shows.push(show);
          }
        }
      } catch (error) {
        this.error = "Failed to search shows";
      } finally {
        this.isLoading = false;
      }
    },
    async getShowById(id: number) {
      const existing = this.shows.find((s) => s.id === id);

      if (existing) return;

      this.isLoading = true;
      this.error = null;

      try {
        const show = await getShowById(id);
        this.shows.push(show);
      } catch (error) {
        this.error = "Failed to fetch show";
      } finally {
        this.isLoading = false;
      }
    },
    clearSearch() {
      this.searchQuery = "";
      this.searchResults = [];
    },
  },
});
