import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetails } from '../../interfaces/pokemon';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center border border-gray-100">
      <span class="self-end text-xs font-bold text-gray-400">#{{ data.id | number:'3.0-0' }}</span>
      
      <div class="w-32 h-32 mb-4 bg-gray-50 rounded-full flex items-center justify-center">
        <img [src]="data.image" [alt]="data.name" loading="lazy"
             class="w-full h-full object-contain drop-shadow-md"
             (error)="handleImageError($event)">
      </div>

      <h2 class="text-xl font-bold text-gray-800 capitalize mb-2">{{ data.name }}</h2>

      <div class="flex gap-2 flex-wrap justify-center">
        <span *ngFor="let type of data.types" 
              [class]="getTypeColor(type) + ' px-3 py-1 rounded-full text-xs text-white font-semibold shadow-sm capitalize'">
          {{ type }}
        </span>
      </div>
    </div>
  `
})
export class PokemonCardComponent {
  @Input({ required: true }) data!: PokemonDetails;

  handleImageError(event: any) {
    event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/6/62/Missing_No.png'; // Fallback
  }

  getTypeColor(type: string): string {
    const colors: {[key: string]: string} = {
      fire: 'bg-red-500', water: 'bg-blue-500', grass: 'bg-green-500',
      electric: 'bg-yellow-400', ice: 'bg-cyan-400', fighting: 'bg-orange-700',
      poison: 'bg-purple-500', ground: 'bg-amber-600', flying: 'bg-indigo-400',
      psychic: 'bg-pink-500', bug: 'bg-lime-600', rock: 'bg-stone-500',
      ghost: 'bg-violet-800', dragon: 'bg-indigo-600', steel: 'bg-slate-400',
      fairy: 'bg-rose-400', normal: 'bg-gray-400'
    };
    return colors[type] || 'bg-gray-400';
  }
}