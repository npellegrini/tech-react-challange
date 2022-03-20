export interface charactersResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: character[];
  }
export interface character {
    birth_year: string;
    created: string;
    edited: string;
    eye_color: string;
    films: []
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    skin_color: string;
    species: []
    starships: []
    url: string;
    vehicles: [];
  }
export interface errorState {
    hasError: boolean;
    message: string;
  }