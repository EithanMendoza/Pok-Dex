import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonCardComponent],
  templateUrl: './pokedex.component.html', 
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent {
  selectedTypes = signal<string[]>([]); 
  isDropdownOpen = signal(false); 

  searchText = signal('');
  isNotMode = signal(false);
  
  availableTypes = ['fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'steel', 'fairy', 'normal'];

  toggleType(type: string) {
    const current = this.selectedTypes();
    if (current.includes(type)) {
      this.selectedTypes.set(current.filter(t => t !== type));
    } else {
      this.selectedTypes.set([...current, type]);
    }
  }

  filteredPokemon = computed(() => {
    const list = this.pokemonService.pokemonList();
    const search = this.searchText().toLowerCase().trim();
    const selected = this.selectedTypes(); 
    const isNot = this.isNotMode();

    if (!search && selected.length === 0) return list; 

    return list.filter(poke => {
      const matchesSearch = search === '' ? true : (
        poke.name.includes(search) || 
        poke.id.toString() === search
      );

      const hasTypeMatch = selected.length === 0 ? true : 
        poke.types.some(t => selected.includes(t));

      if (isNot) {
        
        const excludeSearch = search !== '' ? !matchesSearch : true;
        const excludeType = selected.length > 0 ? !hasTypeMatch : true;

        return excludeSearch && excludeType;
      } else {
        return matchesSearch && hasTypeMatch;
      }
    });
  });

  constructor(public pokemonService: PokemonService) {}
}