import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./pages/home/home').then(m => m.Home)}
  },
  { path: 'booklist',
    loadComponent: () => {
      return import('./pages/booklist/booklist').then(m => m.Booklist)}
  },
  { path: 'citation',
    loadComponent: () => {
      return import('./pages/citation/citation').then(m => m.Citation)}
  }
];
