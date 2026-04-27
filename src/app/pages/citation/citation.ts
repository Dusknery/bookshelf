import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Define the BookCitation interface
interface BookCitation {
  bookId: string;
  author: string;
  citation: string;
}

@Component({
  selector: 'app-citation',
  standalone: true, // not a ngModule component, own its own dependencies, can be imported directly in routes (note to self)
  imports: [FormsModule],
  templateUrl: './citation.html',
  styleUrl: './citation.css',
})
export class Citation {
  // List of citations
  Citations: BookCitation[] = [];

  // Form state management (default values)
  showForm = false;
  isEditing = false;
  editingIndex: number | null = null;

  // Form model, inputs
  citationForm: BookCitation = {
    bookId: '',
    author: '',
    citation: '',
  };

  // Open the form for adding a new citation
  openAddForm() {
    this.showForm = true;
    this.isEditing = false;
    this.editingIndex = null;

    this.citationForm = {
      bookId: '',
      author: '',
      citation: '',
    };
  }

  // Open the form for editing an existing citation
  openEditForm(index: number) {
    this.showForm = true;
    this.isEditing = true;
    this.editingIndex = index;

    this.citationForm = { ...this.Citations[index] };
  }

  // Save the citation (either add new or update existing)
  saveCitation() {
    if (
      !this.citationForm.bookId.trim() ||
      !this.citationForm.author.trim() ||
      !this.citationForm.citation.trim()
    ) {
      return;
    }

    // Remove quotation marks from citation
    this.citationForm.citation = this.citationForm.citation.replace(/^[""]|[""]$/g, '').trim();

    if (this.isEditing && this.editingIndex !== null) {
      this.Citations[this.editingIndex] = { ...this.citationForm };
    } else {
      this.Citations.push({ ...this.citationForm });
    }

    this.closeForm();
  }
   
  // Remove a citation from the list
  removeCitation(index: number) {
    this.Citations.splice(index, 1);  
} 

// Close the form and reset state
closeForm() {
    this.showForm = false;
    this.isEditing = false;
    this.editingIndex = null;

    this.citationForm = {
      bookId: '',
      author: '',
      citation: '',
    };
  } 
}
