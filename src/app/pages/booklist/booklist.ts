import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BooklistItem } from '../../components/booklist-item/booklist-item';

// Define the Book interface
interface Book {
  title: string;
  author: string;
  publicationDate: string;
  addedAt: Date;
}

@Component({
  selector: 'app-booklist',
  standalone: true, // not a ngModule component, own its own dependencies, can be imported directly in routes
  imports: [FormsModule, DatePipe],
  templateUrl: './booklist.html',
  styleUrl: './booklist.css',
})
export class Booklist {
  // List of books in the booklist
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
      this.books[this.editingIndex] = { ...this.bookForm };
    } else {
      this.books.push({ ...this.bookForm });
    }

    this.closeForm();
  }
   
  // Remove a book from the list
  removeBook(index: number) {
    this.books.splice(index, 1);  
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
