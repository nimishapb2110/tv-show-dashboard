import type { SearchResult, Show } from "../types/show";
import apiClient from "./client";

export const fetchShows = (): Promise<Show[]> => apiClient<Show[]>("/shows");
export const searchShows = (query: string): Promise<SearchResult[]> =>
  apiClient<SearchResult[]>(`/search/shows?q=${encodeURIComponent(query)}`);
export const getShowById = (id: number): Promise<Show> =>
  apiClient<Show>(`/shows/${id}`);
