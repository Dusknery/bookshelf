import { Component, EventEmitter, input, output } from '@angular/core';

@Component({
  selector: 'app-booklist-item',
  standalone: true,
  imports: [],
  templateUrl: './booklist-item.html',
  styleUrl: './booklist-item.css',
})
export class BooklistItem {
  book = input<{
    title: string;
    author: string;
    publicationDate: string;
    addedAt: Date;
  }>();
  
  index = input<number>();

  edit = output<number>();
  delete = output<number>();

  onEdit() {
    this.edit.emit(this.index()!);
  } 

  onDelete() {
    this.delete.emit(this.index()!);
  }

}
