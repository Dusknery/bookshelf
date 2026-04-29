import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Citation model interface
export interface BookCitation {
  id: number;
  citationText: string;
  userId: number;
}

export interface CreateCitation {
  citationText: string;
}

// Service to manage citation-related services (fetching, adding, etc.)
@Injectable({
  providedIn: 'root',
})
export class CitationService {
  private apiUrl = 'http://localhost:5070/api/citations';
  
  constructor(private http: HttpClient) {}

  //GET all citations from the backend API
  getCitations(): Observable<BookCitation[]> {
    return this.http.get<BookCitation[]>(this.apiUrl);
  }

  //POST a new citation to the backend API
  addCitation(citation: CreateCitation): Observable<BookCitation> {
    return this.http.post<BookCitation>(this.apiUrl, citation);
  }

  //DELETE a citation from the backend API
  deleteCitation(citationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${citationId}`);
  }
  //PUT (update) a citation in the backend API
  updateCitation(citationId: number, citation: CreateCitation): Observable<BookCitation> {
    return this.http.put<BookCitation>(`${this.apiUrl}/${citationId}`, citation);
  }
}
