import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './pages/home/home';
import { Header } from './components/header/header';
import { Booklist } from "./pages/booklist/booklist";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Home, Booklist],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bookshelf');
}
