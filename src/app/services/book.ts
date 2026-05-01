import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Book model interface
export interface Book {
  id?: number;
  title: string;
  author: string;
  publicationDate: string;
}

// Service to manage book-related services (fetching, adding, etc.)
@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:5070/api/books';

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  //GET all books from the backend API
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl, this.getAuthHeaders());
  }

  //POST a new book to the backend API
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, this.getAuthHeaders());
  }

  //DELETE a book from the backend API
  deleteBook(bookId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bookId}`, this.getAuthHeaders());
  }

  //PUT (update) a book in the backend API
  updateBook(bookId: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${bookId}`, book, this.getAuthHeaders());
  }
}
