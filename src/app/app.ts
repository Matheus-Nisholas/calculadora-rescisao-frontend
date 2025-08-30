import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Adicionado para ser standalone
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // O título não é mais usado no template, mas pode ser mantido.
  protected readonly title = signal('calculadora-rescisao-frontend');
}