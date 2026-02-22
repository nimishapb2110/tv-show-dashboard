import type { Show, SearchResult } from "../types/show";

export const mockShow = (overrides: Partial<Show> = {}): Show => ({
  id: 1,
  name: "Mock Show",
  language: "English",
  genres: ["Drama", "Thriller"],
  status: "Running",
  runtime: 60,
  premiered: "2022-01-01",
  rating: {
    average: 8.5,
  },
  image: {
    medium: "https://www.test.com/200x300",
    original: "https://www.test.com/400x600",
  },
  summary: "This is a mock show used for testing purposes.",
  officialSite: "https://www.test.com",
  ...overrides,
});

export const mockSearchResult = (
  overrides: Partial<SearchResult> = {},
): SearchResult => ({
  score: 1,
  show: mockShow(),
  ...overrides,
});

export const mockShows = (): Show[] => [
  mockShow({
    id: 1,
    name: "Mock Show 1",
    genres: ["Drama"],
    rating: { average: 8.5 },
  }),
  mockShow({
    id: 2,
    name: "Mock Show 2",
    genres: ["Comedy"],
    rating: { average: 9.0 },
  }),
  mockShow({
    id: 3,
    name: "Mock Show 3",
    genres: ["Drama", "Thriller"],
    rating: { average: 7.0 },
  }),
];
