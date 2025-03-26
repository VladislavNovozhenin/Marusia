export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  language: string;
  releaseYear: number;
  releaseDate: string;
  genres: [string];
  plot: string;
  runtime: number;
  budget: string;
  revenue: string;
  homepage: string;
  status: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  trailerYouTubeId: string;
  tmdbRating: number;
  searchL: string;
  keywords: [string];
  countriesOfOrigin: [string];
  languages: [string];
  cast: [string];
  director: string;
  production: string;
  awardsSummary: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  name: string;
  surname: string;
  email: string;
  favorites: number[];
}

export interface Error {
  data: string;
  error: string;
  originalStatus: number;
  status: string;
}
