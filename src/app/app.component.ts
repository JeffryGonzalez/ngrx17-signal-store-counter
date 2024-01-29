import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/counter">Counter</a>
      <a routerLink="/editor">Editor</a>
    </nav>
    <main>
      <router-outlet />
    </main>
  `,
})
export class AppComponent {}
