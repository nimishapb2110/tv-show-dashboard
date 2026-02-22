export interface Rating {
  average: number | null;
}

export interface ShowImage {
  medium: string;
  original: string;
}

export interface Show {
  id: number;
  name: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  premiered: string;
  rating: Rating;
  image: ShowImage | null;
  summary: string;
  officialSite: string | null;
}

export interface SearchResult {
  score: number;
  show: Show;
}

export type ShowsByGenre = Record<string, Show[]>;
