import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs'; 
import { map, catchError, switchMap, mergeMap, toArray } from 'rxjs/operators'; 
import { PokemonDetails, PokemonRaw } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  
  pokemonList = signal<PokemonDetails[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {
    this.loadPokemon(999);
  }

  private loadPokemon(limit: number) {
    this.isLoading.set(true);
    this.error.set(null); 

    this.http.get<{ results: PokemonRaw[] }>(`${this.apiUrl}?limit=${limit}`).pipe(
      switchMap(response => {

        return from(response.results).pipe(

          mergeMap(pokemon => this.getPokemonDetails(pokemon.url), 5),
          
          toArray()
        );
      }),
      catchError(err => {
        console.error('Error cargando Pokémon:', err);
        this.error.set('Error crítico conectando con la PokéAPI. Intente más tarde.');
        this.isLoading.set(false);
        return of([]);
      })
    ).subscribe(details => {
      const sortedDetails = details.sort((a, b) => a.id - b.id);
      
      this.pokemonList.set(sortedDetails);
      this.isLoading.set(false);
    });
  }

  private getPokemonDetails(url: string): Observable<PokemonDetails> {
    return this.http.get<any>(url).pipe(
      map(data => ({
        id: data.id,
        name: data.name,
        image: data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default || 'assets/no-image.png',
        types: data.types.map((t: any) => t.type.name)
      })),
      catchError(() => of({ id: 0, name: 'Unknown', image: '', types: [] })) 
    );
  }
}