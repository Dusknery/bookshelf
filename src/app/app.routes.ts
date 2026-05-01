import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
 {
  path: '',
  pathMatch: 'full',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./pages/home/home').then(m => m.Home)
},
  {
    path: 'booklist',
    canActivate: [authGuard],
    loadComponent: () => {
      return import('./pages/booklist/booklist').then(m => m.Booklist)
    }
  },
  {
    path: 'citation',
    canActivate: [authGuard],
    loadComponent: () => {
      return import('./pages/citation/citation').then(m => m.Citation)
    }
  }
];