export interface Rating {
  average: number | null;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export interface Network {
  name: string;
  country: Country | null;
}

export interface ShowImage {
  medium: string;
  original: string;
}

export interface Show {
  id: number;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  premiered: string | null;
  ended: string | null;
  rating: Rating;
  network: Network | null;
  image: ShowImage | null;
  summary: string | null;
  officialSite: string | null;
}

export interface SearchResult {
  score: number;
  show: Show;
}
