import { defineStore } from "pinia";
import type { Show } from "../types/show";
import { fetchShows } from "../api/services";

export const useShowsStore = defineStore("shows", {
  state: () => ({
    shows: [] as Show[],
    isLoading: false,
    error: null as string | null,
  }),
  getters: {
    showsByGenre: (state): Record<string, Show[]> => {
      const map: Record<string, Show[]> = {};

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
  },
  actions: {
    async fetchShows() {
      this.isLoading = true;
      this.error = null;
      try {
        this.shows = await fetchShows();
      } catch (error) {
        this.error = "Failed to fetch shows";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
