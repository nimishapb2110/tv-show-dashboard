import type { Show } from "../types/show";
import apiClient from "./client";

export const fetchShows = (): Promise<Show[]> => apiClient<Show[]>("/shows");
