export interface PokemonRaw {
    name: string;
    url: string;
  }
  
  export interface PokemonDetails {
    id: number;
    name: string;
    image: string;
    types: string[];
  }
  
  export interface FilterState {
    searchText: string;
    selectedTypes: string[];
    isNotMode: boolean; 
  }