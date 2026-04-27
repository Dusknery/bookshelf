import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BookService } from '../../services/book';
import type { Book } from '../../services/book';

@Component({
  selector: 'app-booklist',
  standalone: true, // not a ngModule component, own its own dependencies, can be imported directly in routes
  imports: [FormsModule, DatePipe],
  templateUrl: './booklist.html',
  styleUrl: './booklist.css',
})
export class Booklist implements OnInit {
  // Local state for the list of books
  books: Book[] = [];

  // Form state management (default values)
  showForm = false;
  isEditing = false;
  editingIndex: number | null = null;

  // Form model, inputs
  bookForm: Book = {
    title: '',
    author: '',
    publicationDate: '',
    addedAt: new Date(),
  };

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  // Open the form for adding a new book
  openAddForm() {
    this.showForm = true;
    this.isEditing = false;
    this.editingIndex = null;

    this.bookForm = {
      title: '',
      author: '',
      publicationDate: '',
      addedAt: new Date(),
    };
  }

  // Open the form for editing an existing book
  openEditForm(index: number) {
    this.showForm = true;
    this.isEditing = true;
    this.editingIndex = index;

    this.bookForm = { ...this.books[index] };
  }

  // Save the book (either add new or update existing)
  saveBook() {
    if (
      !this.bookForm.title.trim() ||
      !this.bookForm.author.trim() ||
      !this.bookForm.publicationDate
    ) {
      return;
    }

    if (this.isEditing && this.editingIndex !== null) {
      const bookId = this.books[this.editingIndex].id;

      if (!bookId) return;

      this.bookService.updateBook(bookId, this.bookForm).subscribe(() => {
        this.loadBooks();
        this.closeForm();
      });
    } else {
      this.bookService.addBook(this.bookForm).subscribe(() => {
        this.loadBooks();
        this.closeForm();
      });
    }
  }

  // Remove a book from the list
  removeBook(book: Book) {
    if (!book.id) return;

    this.bookService.deleteBook(book.id).subscribe(() => {
      this.loadBooks();
    });
  }

  // Close the form and reset state
  closeForm() {
    this.showForm = false;
    this.isEditing = false;
    this.editingIndex = null;

    this.bookForm = {
      title: '',
      author: '',
      publicationDate: '',
      addedAt: new Date(),
    };
  }
}
