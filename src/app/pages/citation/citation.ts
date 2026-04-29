import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CitationService } from '../../services/citations';
import type { BookCitation, CreateCitation } from '../../services/citations';

@Component({
  selector: 'app-citation',
  standalone: true, // not a ngModule component, own its own dependencies, can be imported directly in routes (note to self)
  imports: [FormsModule],
  templateUrl: './citation.html',
  styleUrl: './citation.css',
})
export class Citation implements OnInit {
  // List of citations
  Citations: BookCitation[] = [];

  // Form state management (default values)
  showForm = false;
  isEditing = false;
  editingIndex: number | null = null;

  // Form model, inputs
  citationForm: CreateCitation = {
    citationText: ''
  };

  constructor(private citationService: CitationService) {}

  ngOnInit() {
    this.loadCitations();
  }

  loadCitations() {
    this.citationService.getCitations().subscribe((data) => {
      this.Citations = data;
    });
  }

  // Open the form for adding a new citation
  openAddForm() {
    this.showForm = true;
    this.isEditing = false;
    this.editingIndex = null;

    this.citationForm = {
        citationText: ''
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
      if (!this.citationForm.citationText.trim()) {
        return;
      }

      this.citationForm.citationText = 
        this.citationForm.citationText.replace(/^[""]|[""]$/g, '').trim();


      if (this.isEditing && this.editingIndex !== null) {
        const citationId = this.Citations[this.editingIndex].id;

        if (!citationId) return;

        this.citationService.updateCitation(citationId, this.citationForm)
        .subscribe(() => {
          this.loadCitations();
          this.closeForm();
        });

      
      } else {
        this.citationService.addCitation(this.citationForm)
        .subscribe(() => {
          this.loadCitations();
          this.closeForm();
        });
      }
    }

    removeCitation(citation: BookCitation) {
      if (!citation.id) return;

      this.citationService.deleteCitation(citation.id).subscribe(() => {
        this.loadCitations();
      });
    }

    // Close the form and reset state
    closeForm() {
      this.showForm = false;
      this.isEditing = false;
      this.editingIndex = null;

      this.citationForm = {
          citationText: ''
        };
    }
}