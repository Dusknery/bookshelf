import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Booklist } from "./pages/booklist/booklist";   

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'booklist', component: Booklist }
];
