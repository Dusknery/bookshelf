import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

// Define the Citation model interface
export interface BookCitation {
  id: number;
  citationText: string;
}

export interface CreateCitation {
  citationText: string;
}

// Service to manage citation-related services (fetching, adding, etc.)
@Injectable({
  providedIn: 'root',
})
export class CitationService {
  private apiUrl = 'https://bookshelf-api-production-03f6.up.railway.app/api/citations';

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  //GET all citations from the backend API
  getCitations(): Observable<BookCitation[]> {
    return this.http.get<BookCitation[]>(this.apiUrl, this.getAuthHeaders());
  }

  //POST a new citation to the backend API
  addCitation(citation: CreateCitation): Observable<BookCitation> {
    return this.http.post<BookCitation>(this.apiUrl, citation, this.getAuthHeaders());
  }

  //DELETE a citation from the backend API
  deleteCitation(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
  //PUT (update) a citation in the backend API
  updateCitation(id: number, citation: CreateCitation) {
    return this.http.put(`${this.apiUrl}/${id}`, citation, this.getAuthHeaders());
  }
}
