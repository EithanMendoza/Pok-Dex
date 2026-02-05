import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokedexComponent } from './pages/pokedex/pokedex.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokedexComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokedex';
}