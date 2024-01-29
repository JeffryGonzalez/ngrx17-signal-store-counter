import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CounterComponent } from "./counter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/counter">Counter</a>
      <a routerLink="/editor">Editor</a>
    </nav>
    <main>
      <app-counter />
      <app-counter />
      <app-counter />
      <app-counter />
      <router-outlet />
    </main>
  `,
  imports: [CommonModule, RouterOutlet, RouterLink, CounterComponent],
})
export class AppComponent {}
